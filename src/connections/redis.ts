const redis = require('redis');
import { logger, Redis } from "../main";
import getConfig from "./config";


let connectionsMap: any = null;

const connectionCallback = async () =>
  new Promise(async (resolve, reject) => {
    const { REDIS_HOST, REDIS_PASSWORD, REDIS_PORT } = await getConfig();

    const redisConfig: {
      host: string;
      port: number;
      password?: string;
    } = {
      host: REDIS_HOST,
      port: REDIS_PORT,
    };

    if (REDIS_PASSWORD !== "") redisConfig.password = REDIS_PASSWORD;

    logger.info("redis data :: ", redisConfig);

    const client = redis.createClient(redisConfig);

    client.on("ready", () => {
      logger.info("Redis connected successfully.");
      Redis.init(client);
      connectionsMap = { client };
      resolve(connectionsMap);
    });

    client.on("error", (error: any) => {
      logger.error("Redis Client error:", error);
      reject(error);
    });
  });

const init = async () => connectionsMap || connectionCallback();

export = init;
