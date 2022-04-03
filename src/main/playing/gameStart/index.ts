import { EVENTS, PLAY_STATE, SCHEDULER } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import { GameStartTimerIf } from "../../interface/schedulerIf";
import logger from "../../logger";
import { getNextPlayer } from "../helper";
import scheduler from "../../scheduler";
import { setTableData } from "../../utile/redisCommand";

const gameStart = async (data: GameStartTimerIf) => {
  const { tableDetail } = data;
  const tableId = tableDetail.id;
  try {
    const currentPlayers = Object.keys(tableDetail.seats).filter(
      (ele) => tableDetail.seats[ele].userId
    ).length;

    if (currentPlayers === tableDetail.maxPlayers) {
      tableDetail.tableState = PLAY_STATE.PLAYING_START;
      const { userTurnId, userSeatIndex } = await getNextPlayer(
        tableDetail.seats,
        null
      );
      logger.info(
        "===> gameStart <====userTurnId :",
        userTurnId,
        userSeatIndex
      );
      tableDetail.currentTurn = userTurnId;
      tableDetail.turnCount += 1;

      await setTableData(tableDetail);
      eventEmitter.emit(EVENTS.START_TURN_SOCKET_EVENT, {
        tableId,
        data: {
          index: userSeatIndex,
          timer: 10,
        },
      });
      logger.info(
        "tableDetail.seats[`s${userSeatIndex}`].isBot :: ",
        tableDetail.seats[`s${userSeatIndex}`]
      );
      if (tableDetail.seats[`s${userSeatIndex}`].isBot) {
        scheduler.startJob.turnStartTimerQueue({
          timer: 5 * 1000, // 3 sec
          jobId: `${tableId}`,
          tableDetail,
        });
      } else {
        scheduler.startJob.turnStartTimerQueue({
          timer: 11 * 1000, // 10 sec
          jobId: `${tableId}`,
          tableDetail,
        });
      }
    } else {
      logger.warn("gameStart : out of playare :", currentPlayers);
    }
  } catch (error) {
    logger.error("gameStart : Error :: ", error, tableDetail);
  }
};

export = gameStart;

eventEmitter.on(SCHEDULER.GAME_START_TIMER_SCHEDULE, gameStart);
