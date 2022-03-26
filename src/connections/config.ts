require("dotenv").config();

const { env } = process;
let configData: any = null;

function getEnvConfig() {
  const port = "PORT";

  return Object.freeze({
    SERVER_PORT: env[port],
  });
}

async function getConfigJson() {
  configData = await getEnvConfig();
  return configData;
}

const getConfig = async () => configData || getConfigJson();

export = getConfig;
