import eventEmitter from "../eventEmitter";
import { EVENTS, SCHEDULER } from "../../constants";
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

eventEmitter.on(EVENTS.JOIN_TABLE_SOCKET_EVENT, joinTableEvent);

function addPlayInRoomEvent(payload: any) {
  const { socket, data } = payload;
  addClientInRoom(socket, data.tableId);
}
eventEmitter.on(EVENTS.ADD_PLAYER_IN_TABLE_ROOM, addPlayInRoomEvent);

function gameStartEvent(payload: any) {
  const { tableId, data } = payload;
  const responseData = {
    en: EVENTS.GAME_START_SOCKET_EVENT,
    data,
  };
  sendEventToRoom(tableId, responseData);
}
eventEmitter.on(EVENTS.GAME_START_SOCKET_EVENT, gameStartEvent);

function startTurnEvent(payload: any) {
  const { tableId, data } = payload;
  const responseData = {
    en: EVENTS.START_TURN_SOCKET_EVENT,
    data,
  };
  sendEventToRoom(tableId, responseData);
}
eventEmitter.on(EVENTS.START_TURN_SOCKET_EVENT, startTurnEvent);

function showTakeTurnEvent(payload: any) {
  const { tableId, data } = payload;
  const responseData = {
    en: EVENTS.SHOW_TAKE_TURN_SOCKET_EVENT,
    data,
  };
  sendEventToRoom(tableId, responseData);
}

eventEmitter.on(EVENTS.SHOW_TAKE_TURN_SOCKET_EVENT, showTakeTurnEvent);

function winnerEvent(payload: any) {
  const { tableId, data } = payload;
  const responseData = {
    en: EVENTS.WINNER_SOCKET_EVENT,
    data,
  };
  sendEventToRoom(tableId, responseData);
}

eventEmitter.on(EVENTS.WINNER_SOCKET_EVENT, winnerEvent);
