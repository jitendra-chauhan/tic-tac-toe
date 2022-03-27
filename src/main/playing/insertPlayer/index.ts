import { EVENTS, PLAY_STATE } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import { formatGameTableInfo } from "../../formatResponse";
import { playingTableIf } from "../../interface/playingTableIf";
import { userDetailIf } from "../../interface/signUpIf";
import logger from "../../logger";
import { getRandomeNumber } from "../../utile/commanFunction";
import {
  getTableData,
  popTableFromQueue,
  setTableData,
} from "../../utile/redisCommand";

// create playing table
const createTable = async () => {
  const tableData: playingTableIf = {
    id: getRandomeNumber(),
    tableState: PLAY_STATE.WAITING_FOR_PLAYERS,
    seats: { s0: {}, s1: {} },
    totalPlayers: 0,
    maxPlayers: 2,
    currentTurn: null,
    bord: {
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
        tableDetail.seats[seatKey].isBot = true;
      }
      tableDetail.totalPlayers += 1;
      seatIndex = i;
      break;
    }
  }
  if (seatIndex !== -1) {
    await setTableData(tableDetail);
  }
  return seatIndex;
};

const insertPlayer = async (userDetail: userDetailIf, socket: any) => {
  try {
    let tableId: number | null = await popTableFromQueue(); // find avalible table
    if (!tableId) {
        // create new table
      tableId = await createTable();
    }
    const seatIndex = await insertPlayerInTable(userDetail, tableId);
    const tableDetail = await getTableData(tableId);

    const eventData = await formatGameTableInfo(tableDetail,seatIndex);

    // send Get_Table_Info Event
    eventEmitter.emit(EVENTS.GET_TABLE_INFO_SOCKET_EVENT, {
        socket,
        data: eventData,
      });
  } catch (error) {
    logger.error("insertPlayer : Error :: ", error);
  }
};

export = insertPlayer;