import { SCHEDULER } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import logger from "../../logger";

const gameStartTimerProcess = (job: any) => {
  try {
    logger.info("gameStartTimerProcess has call :: ", job.data);
    eventEmitter.emit(SCHEDULER.GAME_START_TIMER_SCHEDULE, job.data);
  } catch (error) {
    logger.error("gameStartTimerProcess : Error ::", error);
  }
};

export = gameStartTimerProcess;
