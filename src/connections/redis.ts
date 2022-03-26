const redis = require('redis');
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

    console.log("redis data :: ", redisConfig);

    const client = redis.createClient(redisConfig);
    const pubClient = client;
    const subClient = pubClient.duplicate();

    client.on("ready", () => {
      console.log("Redis connected successfully.");
      
      connectionsMap = { client, pubClient, subClient };
      resolve(connectionsMap);
    });

    client.on("error", (error: any) => {
      console.log("Redis Client error:", error);
      reject(error);
    });
  });

const init = async () => connectionsMap || connectionCallback();

export = init;
