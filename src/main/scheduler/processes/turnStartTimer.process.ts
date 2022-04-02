import { SCHEDULER } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import logger from "../../logger";

class TurnStartTimerProcess {
    turnStartTimerProcess = (job: any) => {
    try {
      logger.info("TurnStartTimerProcess has call :: ", job.data);
      eventEmitter.emit(SCHEDULER.TAKE_TURN_SCHEDULE, job.data);
    } catch (error) {
      logger.error("TurnStartTimerProcess : Error ::", error);
    }
  };
}
export = new TurnStartTimerProcess().turnStartTimerProcess;
