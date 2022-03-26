import server from "./http";
import getConfig from "./config";
import socket from "./socket";
import redis from "./redis";

const exportObject = {
  server,
  getConfig,
  socket,
  redis,
};

export = exportObject;
