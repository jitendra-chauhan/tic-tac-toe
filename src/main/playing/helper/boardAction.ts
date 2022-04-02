import { playingTableIf } from "../../interface/playingTableIf";

const updateBoard = (
  boardIndex: string,
  tableDetail: playingTableIf,
  seatIndex: number
): playingTableIf => {
  const symbol = tableDetail.symbol[seatIndex];
  if (tableDetail.board[boardIndex] === "") {
    tableDetail.board[boardIndex] = symbol;
  }
  return tableDetail;
};

const checkBoardAvailable = (
  boardIndex: string,
  tableDetail: playingTableIf
): boolean => {
  let flag = false;
  if (tableDetail.board[boardIndex] === "") {
    flag = true;
  }
  return flag;
};

const emptyBoardIndex = (tableDetail: playingTableIf): string => {
//   let boardIndex = "";

/*
* better user object and array function
*/
  const boardIndex = Object.keys(tableDetail.board).filter((key)=>tableDetail.board[key] === "")

/*
* user for loop 
*/

//   for (let i = 0; i < 3; i++) {
//     for (let j = 0; j < 3; j++) {
//       if (tableDetail.board[`${i}${j}`] === "") {
//         boardIndex = `${i}${j}`;
//         break;
//       }
//     }
//     if (boardIndex !== "") {
//       break;
//     }
//   }

  return boardIndex[0];
};

const exportObject = {
  updateBoard,
  checkBoardAvailable,
  emptyBoardIndex,
};

export = exportObject;
