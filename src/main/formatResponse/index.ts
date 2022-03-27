import {
  JoinTableInfoFormatIf,
  playingTableIf,
} from "../interface/playingTableIf";
import { signUpFormatIf, userDetailIf } from "../interface/signUpIf";

// Formant SingUp Event Document
const formatSingUpInfo = (userDetail: userDetailIf): signUpFormatIf => {
  const data: signUpFormatIf = {
    userId: userDetail.userId,
    name: userDetail.name,
  };

  return data;
};

// Formant Game Table Info Event Document
const formatGameTableInfo = async (
  tableDetail: playingTableIf,
  seatIndex: number
) => {
  let data = {
    ...tableDetail,
    seatIndex,
  };

  return data;
};

// Formant Join Table Event Document
const formatJoinTableInfo = (
  seatIndex: number,
  TableDetail: playingTableIf
): JoinTableInfoFormatIf => {
  const data :JoinTableInfoFormatIf = {
    totalPlayers: TableDetail.totalPlayers,
    playarDetail: {
      seatIndex,
      userId: TableDetail.seats[`s${seatIndex}`].userId,
      name: TableDetail.seats[`s${seatIndex}`].name,
    },
  };

  return data;
};

const exportObject = {
  formatSingUpInfo,
  formatGameTableInfo,
  formatJoinTableInfo
};

export = exportObject;
