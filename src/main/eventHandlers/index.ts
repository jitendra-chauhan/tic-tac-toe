import eventEmitter from "../eventEmitter";
import { EVENTS } from "../../constants";
import { addClientInRoom, sendEventToClient, sendEventToRoom } from "../socket";

async function singUpEvent(payload: any) {
  const { socket, data } = payload;
  const responseData = {
    en: EVENTS.SIGN_UP_SOCKET_EVENT,
    data,
  };
  await sendEventToClient(socket, responseData);
}
eventEmitter.on(EVENTS.SIGN_UP_SOCKET_EVENT, singUpEvent);

async function getTableInfoEvent(payload: any) {
  const { socket, data } = payload;
  const responseData = {
    en: EVENTS.GET_TABLE_INFO_SOCKET_EVENT,
    data,
  };
  await sendEventToClient(socket, responseData);
}

eventEmitter.on(EVENTS.GET_TABLE_INFO_SOCKET_EVENT, getTableInfoEvent);

function joinTableEvent(payload: any) {
  const { tableId, data } = payload;
  const responseData = {
    en: EVENTS.JOIN_TABLE_SOCKET_EVENT,
    data,
  };
  sendEventToRoom(tableId, responseData);
}

eventEmitter.on(EVENTS.JOIN_TABLE_SOCKET_EVENT,joinTableEvent);

function addPlayInRoomEvent(payload: any) {
  const { socket, data } = payload;
  addClientInRoom(socket, data.tableId);
}
eventEmitter.on(EVENTS.ADD_PLAYER_IN_TABLE_ROOM,addPlayInRoomEvent);