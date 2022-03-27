import { EVENTS } from "../../constants";
import logger from "../logger";
import eventEmitter from "../eventEmitter";
import { signUpIf, userDetailIf } from "../interface/signUpIf";
import { setUser } from "../utile/redisCommand";
import { getRandomeNumber } from "../utile/commanFunction";
import insertPlayer from "../playing/insertPlayer";
import { formatSingUpInfo } from "../formatResponse";

const createUser = async (
  data: signUpIf,
  socket: any
): Promise<userDetailIf> => {
  const userDetail: userDetailIf = {
    name: data.name,
    userId: getRandomeNumber(),
    socketId: socket.id,
    isBot: data.isBot,
  };
  await setUser(userDetail.userId, userDetail);
  return userDetail;
};

const signUp = async (data: signUpIf, socket: any) => {
  try {
    const userData = await createUser(data, socket);

    socket.userData = userData;
    const eventData = await formatSingUpInfo(userData);

    eventEmitter.emit(EVENTS.SIGN_UP_SOCKET_EVENT, {
      socket,
      data: eventData,
    });

    insertPlayer(userData, socket);
  } catch (error) {
    logger.error(`signUp : error :: ${error}`);
  }
};

export = signUp;
