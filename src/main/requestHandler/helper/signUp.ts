import { signUpRequestIf } from "../../interface/signUpIf";
import logger from "../../logger";
import signUp from "../../signUp";

function signUpHelper({ data }: signUpRequestIf, socket: any) {
  data.isBot = false;
  return signUp(data, socket).catch((e: any) => logger.error(e));
}

export = signUpHelper;
