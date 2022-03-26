const SocketIO = require("socket.io");
import socketIO  from "socket.io";
import server from "./http";

let socketClient: any = null;

function socketConnnectionHandle(client: any) {
  console.log("connected socket");

  // client.conn is default menthod for ping pong request
  client.conn.on("ping", (packet: any) => {
    client.emit("pong", packet);
  });

  /**
   * error event handler
   */
  client.on("error", (error: any) =>
    console.log("Socket : client error......,", error)
  );

  /**
   * disconnect request handler
   */
  client.on("disconnect", () => {
    console.log("DISCONNECT user : ", client.id);
  });
}

function createSocketServer() {
    console.log('===> call socket <===');
    
  const socketConfig = {
    transports: ["websocket", "polling"],
    pingInterval: 1000,
    pingTimeout: 10000,
    allowEIO3: true,
  };

  socketClient = SocketIO(server, socketConfig).of('/socket');

  socketClient.on("connection", socketConnnectionHandle);

  return socketClient;
}

const init = () => socketClient || createSocketServer();

export = init;
