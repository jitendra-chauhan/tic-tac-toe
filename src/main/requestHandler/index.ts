import { EVENTS } from "../../constants";
import logger from "../logger";
import { signUpHelper, takeTurnHelper } from "./helper";

async function requestHandler(socket: any, body: any) {
  if (!socket) {
    logger.error(new Error("socket instance not found"));
  }

  /* +-------------------------------------------------------------------+
        desc: function to handle all event processes
        i/p: request = {en: `event name`, data: `data`}
    +-------------------------------------------------------------------+ */

  const data = body;
  try {
    if (typeof body.data == "undefined" && typeof body.en == "undefined") {
      throw new Error("Data not valid!");
    }

    if (!socket) {
      throw new Error("socket instance not found");
    }

    logger.info("event ::", body.en, data);
    switch (body.en) {
      case EVENTS.SIGN_UP_SOCKET_EVENT: // SIGN_UP
        await signUpHelper(body, socket);
        break;
      case EVENTS.TAKE_TURN_SOCKET_EVENT: // TAKE_TURN
        await takeTurnHelper(body, socket);
        break;
      default:
        break;
    }
  } catch (error) {
    logger.error("requestHandler : error :: ", body.en, error);
  }
}

export = requestHandler;
