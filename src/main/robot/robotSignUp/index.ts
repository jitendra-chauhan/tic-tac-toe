import logger from "../../logger";
import signUp from "../../signUp";

const robotSignUp = () => {
    const socket = {
        id : 'ROBOT'
    }
    const data = {
        name:'Robot',
        isBot: true
    }
    return signUp(data, socket).catch((e: any) =>  logger.error(e));
}

export = robotSignUp;
