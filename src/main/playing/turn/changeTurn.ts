import { EVENTS, SCHEDULER } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import { playingTableIf } from "../../interface/playingTableIf";
import logger from "../../logger";
import { getNextPlayer } from "../helper";
import checkWinnerdata from "../winner";
import scheduler from "../../scheduler";
import { setTableData } from "../../utile/redisCommand";

const changeTurn = async (tableDetail: playingTableIf) => {
  try {
    const tableId = tableDetail.id;
    // checkWinner
    // const promise = await Promise.all([checkWinnerdata(tableDetail.id)]);
    const winner: any = await checkWinnerdata(tableDetail.id);
    if (winner.index === -2) {
      const { userTurnId, userSeatIndex } = await getNextPlayer(
        tableDetail.seats,
        tableDetail.currentTurn
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
        "changeTurn :: tableDetail.seats[`s${userSeatIndex}`].isBot :: ",
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
    } else if (winner.index === -1) {
      //tie
      eventEmitter.emit(EVENTS.WINNER_SOCKET_EVENT, {
        tableId,
        data: {
          index: -1,
          tie: true,
        },
      });
    } else {
      // winner
      eventEmitter.emit(EVENTS.WINNER_SOCKET_EVENT, {
        tableId,
        data: {
          index: winner.index,
          tie: false,
        },
      });
    }
  } catch (error) {
    logger.error("gameStart : Error :: ", error, tableDetail);
  }
};

export = changeTurn;

// eventEmitter.on(SCHEDULER.TAKE_TURN_SCHEDULE, changeTurn);
