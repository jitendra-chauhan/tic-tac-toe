import { takeTurnTimerIf } from "../../interface/schedulerIf";
import logger from "../../logger";
import { turnStartTimerProcess } from "../processes";
import QueueBaseClass from "./queueBaseClass";

// const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = getConfig();

// const redisConfig: {
//   host: string;
//   port: number;
//   password?: string;
// } = {
//   host: REDIS_HOST,
//   port: REDIS_PORT,
// };

// if (REDIS_PASSWORD !== "") redisConfig.password = REDIS_PASSWORD;

// const turnStartTimerBull = new Bull('turnStartTimer', { redis: redisConfig });

class TurnStartTimerQueue extends QueueBaseClass {
  constructor() {
    super("turnStartTimer");
    this.queue.process(turnStartTimerProcess);
  }

  turnStartTimerQueue = async (data: takeTurnTimerIf) => {
    try {
      const queueOption = {
        delay: data.timer,
        jobId: data.jobId,
        removeOnComplete: true,
      };

      await this.queue.add(data, queueOption);
    } catch (error) {
      logger.error("TurnStartTimerQueue : error :: ", error);
    }
  };
}
export = new TurnStartTimerQueue().turnStartTimerQueue;
