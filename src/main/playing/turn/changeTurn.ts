import { EVENTS, PLAY_STATE, SCHEDULER } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import { GameStartTimerIf } from "../../interface/schedulerIf";
import logger from "../../logger";
import { getNextPlayer } from "../helper";

const gameStart = async (data: GameStartTimerIf) => {
  const { tableDetail } = data;

  try {
   // checkWinner
      const { userTurnId, userSeatIndex } = await getNextPlayer(
        tableDetail.seats,
        null
      );
      tableDetail.currentTurn = userTurnId;
      tableDetail.turnCount += 1;

      eventEmitter.emit(EVENTS.START_TURN_SOCKET_EVENT, {
        tableId: tableDetail.id,
        data: {
          index: userSeatIndex,
        },
      });
    
  } catch (error) {
    logger.error("gameStart : Error :: ", error, tableDetail);
  }
};

export = gameStart;

eventEmitter.on(SCHEDULER.GAME_START_TIMER_SCHEDULE, gameStart);
