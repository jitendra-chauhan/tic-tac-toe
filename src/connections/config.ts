require("dotenv").config();

const { env } = process;
let configData: any = null;

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

async function getConfigJson() {
  configData = await getEnvConfig();
  return configData;
}

const getConfig = async () => configData || getConfigJson();

export = getConfig;
