const SocketIO = require("socket.io");
import server from "./http";
import { EVENTS } from "../constants";

let socketClient: any = null;

async function socketConnnectionHandle(client: any) {
  const { logger, requestHandler } = await import("../main");
  logger.info("connected socket");

  // client.conn is default menthod for ping pong request
  client.conn.on("ping", (packet: any) => {
    client.emit("pong", packet);
  });

  /**
   * error event handler
   */
  client.on("error", (error: any) =>
    logger.error("Socket : client error......,", error)
  );

  /**
   * disconnect request handler
   */
  client.on("disconnect", () => {
    logger.info("DISCONNECT user : ", client.id);
  });

  /**
   * get Event request handler
   */
  client.on("req", (socket: any) => {
    requestHandler(client, socket);
  });
}

function createSocketServer() {

  const socketConfig = {
    transports: ["websocket", "polling"],
    pingInterval: 1000,
    pingTimeout: 10000,
    allowEIO3: true,
  };

  socketClient = SocketIO(server, socketConfig).of("/socket");

  socketClient.on("connection", socketConnnectionHandle);

  return socketClient;
}

const init = () => socketClient || createSocketServer();

export = init;
