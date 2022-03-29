import logger from "../../logger";
import { usersSeatsIf } from "../../interface/playingTableIf";
import { getRandomeNumber } from "../../utile/commanFunction";

// get next player turn Id
async function getNextPlayer(
  seats: usersSeatsIf,
  currentTurn: number | null
): Promise<{ userTurnId: number; userSeatIndex: number }> {
  try {
    logger.info(
      "getNextPlayer : seats :: ",
      seats,
      " currentTurn ::",
      currentTurn
    );
    let nextIndex = -1;
    if (currentTurn) {
      const index: any = Object.keys(seats).find(
        (key) => currentTurn === seats[key].userId
      );
      const currentIndex = seats[index].seatIndex;

      logger.info("getNextPlayer : currentIndex :: ", currentIndex);
      nextIndex = (currentIndex + 1) % Object.keys(seats).length;
      logger.info("getNextPlayer : nextIndex :: ", nextIndex);
    } else {
      nextIndex = getRandomeNumber(0, 1);
    }
    return {
      userTurnId: seats[`s${nextIndex}`].userId,
      userSeatIndex: nextIndex,
    };
  } catch (error) {
    logger.error(`getNextPlayer currentTurn: ${currentTurn} :: `, seats, error);
    throw error;
  }
}

export = getNextPlayer;
