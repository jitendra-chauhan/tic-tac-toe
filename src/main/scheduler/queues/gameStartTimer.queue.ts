import Bull from "bull";
import getConfig from "../../../connections/config";
import { GameStartTimerIf } from "../../interface/schedulerIf";
import logger from "../../logger";
import { gameStartTimerProcess } from "../processes";

const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = getConfig();

const redisConfig: {
  host: string;
  port: number;
  password?: string;
} = {
  host: REDIS_HOST,
  port: REDIS_PORT,
};

if (REDIS_PASSWORD !== "") redisConfig.password = REDIS_PASSWORD;

const gameStartTimer = new Bull("gameStartTimer", { redis: redisConfig });

const GameStartTimerQueue = (data: GameStartTimerIf) => {
  try {
    const queueOption = {
      dealy: data.timer,
      jobId: data.jobId,
      removeOnComplete: true,
    };
    gameStartTimer.add(data, queueOption);
  } catch (error) {
    logger.error("GameStartTimerQueue : error :: ", error);
  }
};

gameStartTimer.process(gameStartTimerProcess);

export = GameStartTimerQueue;
