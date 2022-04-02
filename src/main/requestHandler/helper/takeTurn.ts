import {  takeTurnRequestIf } from "../../interface/signUpIf";
import logger from "../../logger";
import { turn} from "../../playing";

function takeTurnHelper({ data }: takeTurnRequestIf, socket: any) {
  return turn.takeTurn(data, socket).catch((e: any) => logger.error(e));
}

export = takeTurnHelper;
