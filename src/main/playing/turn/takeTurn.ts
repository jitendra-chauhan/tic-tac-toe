import { EVENTS } from "../../../constants";
import eventEmitter from "../../eventEmitter";
import logger from "../../logger";
import { getTableData, setTableData } from "../../utile/redisCommand";
import { boardAction } from "../helper";
import changeTurn from "./changeTurn";
import scheduler from "../../scheduler";
import { takeTurn } from "../../interface/signUpIf";

const takeTurn = async (data: takeTurn, socket: any) => {
  const { tableId, userId } = socket.userData;
  const { seatIndex, boardIndex } = data;
  try {
    // cance timer
    let tableDetail = await getTableData(tableId);

    if (tableDetail.currentTurn && tableDetail.currentTurn !== userId)
      throw new Error(`current turn is not your turn ${userId}`);

      await scheduler.cancelJob.turnStartTimerCancel(tableId);
      
      const boardAvailable = await boardAction.checkBoardAvailable(
        boardIndex,
        tableDetail
        );
        
        if (!boardAvailable) throw new Error("board is not empty!");

    tableDetail = await boardAction.updateBoard(
      boardIndex,
      tableDetail,
      seatIndex
    );
    await setTableData(tableDetail);

    eventEmitter.emit(EVENTS.SHOW_TAKE_TURN_SOCKET_EVENT, {
      tableId: tableDetail.id,
      data: {
        index: seatIndex,
        boardIndex,
        isTimeOut: false,
      },
    });

    changeTurn(tableDetail);
  } catch (error) {
    logger.error("takeTurn :: Error :", error, data);
  }
};

export = takeTurn;
