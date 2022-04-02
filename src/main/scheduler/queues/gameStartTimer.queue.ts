// const Bull = require("bull");
// import getConfig from "../../../connections/config";
import { GameStartTimerIf } from "../../interface/schedulerIf";
import logger from "../../logger";
import { gameStartTimerProcess } from "../processes";
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
// logger.info('redisConfig ::::: ',redisConfig)
// const gameStartTimerBull = new Bull('gameStartTimer', { redis: redisConfig });

class GameStartTimerQueue extends QueueBaseClass {
  constructor() {
    super("gameStartTimer");
    this.queue.process(gameStartTimerProcess);
  }

 gameStartTimerQueue = async (data: GameStartTimerIf) => {
    try {
      logger.info("gameStartTimerQueue :: calll queue ::",data)
      const queueOption = {
        delay: data.timer,
        jobId: data.jobId,  
        removeOnComplete: true,
      };

      await this.queue.add(data, queueOption);
    } catch (error) {
      logger.error("GameStartTimerQueue : error :: ", error);
    }
  };
}
// gameStartTimerBull.process(gameStartTimerProcess);
export = new GameStartTimerQueue().gameStartTimerQueue;
// export = gameStartTimerQueue;
