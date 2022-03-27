import { EVENTS } from "../../constants";
import logger from "../logger";
import eventEmitter from "../eventEmitter";
import { signUpIf, userDetail } from "../interface/signUpIf";
import { setUser } from "../utile/redisCommand";
import { getRandomeNumber } from "../utile/commanFunction";

const createUser = async (data: signUpIf, socket: any): Promise<userDetail> => {
  const userDetail: userDetail = {
    name: data.name,
    userId: getRandomeNumber(),
    socketId: socket.id,
  };
  await setUser(userDetail.userId, userDetail);
  return userDetail;
};

const signUp = async (data: signUpIf, socket: any) => {
  try {
    const userData = await createUser(data, socket);

    socket.userData = userData;
    eventEmitter.on(EVENTS.SIGN_UP_SOCKET_EVENT, {
        socket,
        data : userData
    });

  } catch (error) {
    logger.error(`signUp : error :: ${error}`);
  }
};

export = signUp;
