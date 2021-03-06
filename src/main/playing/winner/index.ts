import { getTableData } from "../../utile/redisCommand";

const checkWinnerdata = async (tableId: number) => 
  new Promise(async (resolve, reject) => {
    const tableDetail = await getTableData(tableId);

    if (!tableDetail) throw new Error("table data is not avalible");

    const board = tableDetail.board;

    let countx = 0;
    let counto = 0;

    let countxx = 0;
    let countoo = 0;

    let m = 2;
    let xcountx = 0;
    let ocounto = 0; // 2

    let counterx = 0;
    let countero = 0; // 1

    // check left to right
    for (let i = 0; i < 3; i++) {
      countx = 0;
      counto = 0; //     4
      for (let l = 0; l < 3; l++) {
        if (board[`${i}${l}`] == "X") {
          countx++;

          if (countx == 3) {
            resolve({index : 0})
          }
        } else if (board[`${i}${l}`] == "O") {
          counto++;

          if (counto == 3) {
            resolve({index : 1})
          }
        }
      }
    }

    // top to bottom
    for (let i = 0; i < 3; i++) {
      countxx = 0;
      countoo = 0; // 3
      for (let l = 0; l < 3; l++) {
        if (board[`${l}${i}`] == "X") {
          countxx++;
          if (countxx == 3) {
            resolve({index : 0})
          }
        } else if (board[`${l}${i}`] == "O") {
          countoo++;
          if (countoo == 3) {
            resolve({index : 1})
          }
        }
      }
    }

    //   left to bottom
    for (let n = 0; n < 3; n++) {
      if (board[`${n}${m}`] == "X") {
        xcountx++;
        if (xcountx == 3) {
            resolve({index : 0})
        }
      } else if (board[`${n}${m}`] == "O") {
        ocounto++;
        if (ocounto == 3) {
            resolve({index : 1})
        }
      }
      m--;
    }

    //   right to bottom
    for (let n = 0; n < 3; n++) {
      if (board[`${n}${n}`] == "X") {
        counterx++;

        if (counterx == 3) {
            resolve({index : 0})
        }
      } else if (board[`${n}${n}`] == "O") {
        countero++;

        if (countero == 3) {
            resolve({index : 1})
        }
      }
    }
    if (
      countero < 3 &&
      counterx < 3 &&
      counto < 3 &&
      countx < 3 &&
      countoo < 3 &&
      countxx < 3 &&
      xcountx < 3 &&
      ocounto < 3 &&
      tableDetail.turnCount === 9
    ) {
        resolve({index : -1})
    }else{
        resolve({index : -2})
    }
  });


export = checkWinnerdata