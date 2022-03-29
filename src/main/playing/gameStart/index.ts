import { EVENTS, PLAY_STATE, SCHEDULER } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import { GameStartTimerIf } from "../../interface/schedulerIf";
import logger from "../../logger";
import { getNextPlayer } from "../helper";

const gameStart = async (data: GameStartTimerIf) => {
  const { tableDetail } = data;
  
  try {
    const currentPlayers = Object.keys(tableDetail.seats).filter(
      (ele) => tableDetail.seats[ele].userId
    ).length;

    if (currentPlayers === tableDetail.maxPlayers) {
      tableDetail.tableState = PLAY_STATE.PLAYING_START;
      const {userTurnId,userSeatIndex} = await getNextPlayer(tableDetail.seats, null);
      tableDetail.currentTurn = userTurnId;

      eventEmitter.emit(EVENTS.START_TURN_SOCKET_EVENT,{
        tableId:tableDetail.id,
        index:userSeatIndex
      })
    } else {
      logger.warn("gameStart : out of playare :", currentPlayers);
    }
  } catch (error) {
    logger.error("gameStart : Error :: ", error, tableDetail);
  }
};

export = gameStart;

eventEmitter.on(SCHEDULER.GAME_START_TIMER_SCHEDULE, gameStart);
