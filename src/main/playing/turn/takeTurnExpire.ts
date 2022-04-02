import { EVENTS } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import logger from "../../logger";
import { setTableData } from "../../utile/redisCommand";
import { emptyBoardIndex, updateBoard } from "../helper/boardAction";

const takeTurnExpire = async (data: any) => {
  try {
    let { tableDetail } = data;

    const userIndex = Object.keys(tableDetail.seats).findIndex(
      (key) => tableDetail.seats[key].userId === tableDetail.currentTurn
    );

    const boardIndex = emptyBoardIndex(tableDetail);

    tableDetail = await updateBoard(boardIndex, tableDetail, userIndex);

    await setTableData(tableDetail);

    eventEmitter.emit(EVENTS.SHOW_TAKE_TURN_SOCKET_EVENT, {
      tableId: tableDetail.id,
      data: {
        index: userIndex,
        boardIndex,
        isTimeOut: true,
      },
    });
  } catch (error) {
    logger.error("takeTurnExpire :: Error : ", error, data);
  }
};

export = takeTurnExpire;
