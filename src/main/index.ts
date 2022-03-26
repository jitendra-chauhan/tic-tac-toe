import logger from "./logger";
import Redis from "./redis";
import requestHandler from "./requestHandler";

const exportObject = {
  logger,
  requestHandler,
  Redis,
};
export = exportObject;
