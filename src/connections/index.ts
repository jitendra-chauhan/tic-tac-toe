import server from "./http";
import getConfig from "./config";
import socket from "./socket";

const exportObject = {
  server,
  getConfig,
  socket,
};

export = exportObject;
