import eventEmitter from "../eventEmitter"
import { EVENTS } from "../../constants";
import { sendEventToClient } from "../socket";

async function singUpCompleteEvent(payload: any) {
    const { socket, data } = payload;
    const responseData = {
      en: EVENTS.SIGN_UP_SOCKET_EVENT,
      data,
    };
    await sendEventToClient(socket, responseData);
  }

  eventEmitter.on(EVENTS.SIGN_UP_SOCKET_EVENT, singUpCompleteEvent);