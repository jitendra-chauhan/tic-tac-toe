import eventEmitter from "../eventEmitter";
import { EVENTS } from "../../constants";
import { sendEventToClient } from "../socket";

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
