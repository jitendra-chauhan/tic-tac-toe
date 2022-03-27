import { playingTableIf } from "../interface/playingTableIf";
import { signUpFormatIf, userDetailIf } from "../interface/signUpIf";

// Formant SingUp Event Document
async function formatSingUpInfo(
  userData: userDetailIf
): Promise<signUpFormatIf> {
  let data = {
    userId: userData.userId,
    name: userData.name,
  };

  return data;
}

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

const exportObject = {
  formatSingUpInfo,
  formatGameTableInfo,
};

export = exportObject;
