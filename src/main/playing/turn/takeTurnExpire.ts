import { EVENTS, SCHEDULER } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import { takeTurnTimerIf } from "../../interface/schedulerIf";
import logger from "../../logger";
import { setTableData } from "../../utile/redisCommand";
import { emptyBoardIndex, updateBoard } from "../helper/boardAction";
import changeTurn from "./changeTurn";
import scheduler from "../../scheduler";

const takeTurnExpire = async (data: takeTurnTimerIf) => {
  try {
    let { tableDetail } = data;
    const tableId = tableDetail;

    // cance timer
    await scheduler.cancelJob.turnStartTimerCancel(`${tableId}`);
    const userIndex = Object.keys(tableDetail.seats).findIndex(
      (key) => tableDetail.seats[key].userId === tableDetail.currentTurn
    );

    let isTimeOut = true;
    const isBot = tableDetail.seats[`s${userIndex}`].isBot;

    if (isBot) isTimeOut = false;
    const boardIndex = emptyBoardIndex(tableDetail);

    tableDetail = await updateBoard(boardIndex, tableDetail, userIndex);

    await setTableData(tableDetail);

    eventEmitter.emit(EVENTS.SHOW_TAKE_TURN_SOCKET_EVENT, {
      tableId: tableDetail.id,
      data: {
        index: userIndex,
        boardIndex,
        isTimeOut,
      },
    });

    changeTurn(tableDetail);
  } catch (error) {
    logger.error("takeTurnExpire :: Error : ", error, data);
  }
};

export = takeTurnExpire;

eventEmitter.on(SCHEDULER.TAKE_TURN_SCHEDULE, takeTurnExpire);
