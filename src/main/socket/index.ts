import { socket } from "../../connections";
import logger from "../logger";

async function sendEventToClient(client: any, data: any) {
  try {
    const socketClient: any = socket();

    logger.debug("SEND EVENT TO CLIENT: ", data);

    if (typeof client !== "string") client.emit('res', { data });
    else socketClient.to(client).emit('res', { data });
  } catch (error) {
    logger.error("sendEventToClient :: error :: ", error);
  }
}

async function sendEventToRoom(roomId: any, data: any) {
  const socketClient: any = socket();

  socketClient.to(roomId).emit(data.en, { data });
}

function addClientInRoom(socket: any, roomId: any) {
  return socket.join(roomId);
}

function getSocketFromSocketId(socketId: any) {
  const socketClient: any = socket();
  return socketClient.sockets.sockets.get(socketId);
}

const exportObject = {
  sendEventToClient,
  sendEventToRoom,
  addClientInRoom,
  getSocketFromSocketId,
};

export = exportObject;
