require("dotenv").config();

const { env } = process;
let configData: any = null;

interface config {
  SERVER_PORT:string
  REDIS_HOST:string
  REDIS_PASSWORD:string
  REDIS_PORT:number
}

function getEnvConfig() {
  const port = "PORT";
  const redisHost = "REDIS_HOST";
  const redisPass = "REDIS_PASSWORD";
  const redisPort = "REDIS_PORT";

  return Object.freeze({
    SERVER_PORT: env[port],
    REDIS_HOST: env[redisHost],
    REDIS_PASSWORD: env[redisPass],
    REDIS_PORT: env[redisPort],
  });
}

function getConfigJson() {
  configData = getEnvConfig();
  return configData;
}

const getConfig = () : config  => configData || getConfigJson();

export = getConfig;
