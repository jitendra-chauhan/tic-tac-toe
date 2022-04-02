import Bull from "bull";
import getConfig from "../../../connections/config";

class QueueBaseClass {
  public queue: any;
  constructor(queueName: string) {
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

    this.queue = new Bull(queueName, { redis: redisConfig });
  }
}

export default QueueBaseClass