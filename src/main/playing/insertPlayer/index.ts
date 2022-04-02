import { EVENTS, PLAY_STATE } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import { formatGameTableInfo, formatJoinTableInfo } from "../../formatResponse";
import { playingTableIf } from "../../interface/playingTableIf";
import { userDetailIf } from "../../interface/signUpIf";
import logger from "../../logger";
import { getRandomeNumber } from "../../utile/commanFunction";
import {
  getTableData,
  popTableFromQueue,
  pushTableInQueue,
  setTableData,
} from "../../utile/redisCommand";
import scheduler from "../../scheduler";

// create playing table
const createTable = async () => {
  const tableData: playingTableIf = {
    id: getRandomeNumber(),
    tableState: PLAY_STATE.WAITING_FOR_PLAYERS,
    seats: { s0: {}, s1: {} },
    totalPlayers: 0,
    maxPlayers: 2,
    currentTurn: null,
    turnCount:0,
    board: {
      "00": "",
      "01": "",
      "02": "",
      "10": "",
      "11": "",
      "12": "",
      "20": "",
      "21": "",
      "22": "",
    },
    symbol: ["x", "o"],
  };

  const tableId = await setTableData(tableData);

  return tableId;
};

// insert user data in table
const insertPlayerInTable = async (
  userDetail: userDetailIf,
  tableId: number
): Promise<number> => {
  const tableDetail = await getTableData(tableId);
  let seatIndex: number = -1;
  if (tableDetail) {
    for (let i = 0; i < 2; i++) {
      const seatKey = `s${i}`;
      const seatDetail = tableDetail.seats[seatKey];

      if (Object.keys(seatDetail).length === 0) {
        tableDetail.seats[seatKey].name = userDetail.name;
        tableDetail.seats[seatKey].userId = userDetail.userId;
        tableDetail.seats[seatKey].seatIndex = i;
        tableDetail.seats[seatKey].isBot = userDetail.isBot;
        tableDetail.totalPlayers += 1;
        seatIndex = i;
        break;
      }
    }
  }
  if (seatIndex !== -1) {
    await setTableData(tableDetail);
  }
  return seatIndex;
};

const insertPlayer = async (userDetail: userDetailIf, socket: any) => {
  const { robotSignUp } = await import("../../robot");

  try {
    let tableId: number | null = await popTableFromQueue(); // find avalible table
    if (!tableId) {
      // create new table
      tableId = await createTable();
    }
    const seatIndex = await insertPlayerInTable(userDetail, tableId);
    const tableDetail = await getTableData(tableId);

    const eventData = await formatGameTableInfo(tableDetail, seatIndex);

    // send Get_Table_Info Event
    eventEmitter.emit(EVENTS.GET_TABLE_INFO_SOCKET_EVENT, {
      socket,
      data: eventData,
    });

    const joinTableEventData = await formatJoinTableInfo(
      seatIndex,
      tableDetail
    );

    // send JOIN_TABLE event
    eventEmitter.emit(EVENTS.JOIN_TABLE_SOCKET_EVENT, {
      tableId,
      data: joinTableEventData,
    });

    // join player in socket room
    eventEmitter.emit(EVENTS.ADD_PLAYER_IN_TABLE_ROOM, {
      socket,
      data: { tableId },
    });

    socket.userData.tableId = tableId;

    if (tableDetail.totalPlayers !== tableDetail.maxPlayers) {
      // push Table In Queue
      await pushTableInQueue(tableId);
      robotSignUp();
    } else if (tableDetail.totalPlayers === tableDetail.maxPlayers) {
      eventEmitter.emit(EVENTS.GAME_START_SOCKET_EVENT, {
        tableId,
        data: {
          time: 5,
        },
      });

      scheduler.startJob.GameStartTimerQueue({
        timer: 6 * 1000,
        jobId: `${tableId}`,
        tableDetail,
      });

      tableDetail.tableState = PLAY_STATE.GAME_TIMER_START;

      await setTableData(tableDetail);
    }
  } catch (error) {
    logger.error("insertPlayer : Error :: ", error);
  }
};

export = insertPlayer;
