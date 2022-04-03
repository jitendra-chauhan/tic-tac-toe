class Game {
  constructor(roomId, symbol) {
    this.roomId = roomId;
    this.symbol = symbol;
    this.isTurn = false;
  }
  getRoomId = () => this.roomId;
  getSymbol = () => this.symbol;
  setTurn = (flag) => (this.isTurn = flag);
  displayGameBoard = () => {
    $(".menu").css("display", "none");
    $(".center").css("display", "block");
    $(".board").css("display", "block");
  };

  createBoard = () => {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        $(`#button_${i}${j}`).on("click", function () {
          if (!$(this).prop("disabled")) {
            $(`.center`).prop("disabled", true);
            const row = parseInt(this.id.split("_")[1][0]);
            const col = parseInt(this.id.split("_")[1][1]);
            const boardIndex = `${row}${col}`;

            const seatIndex = playerDetail.getPlayerSeatIndex();

            socket.emit("req", {
              en: "TAKE_TURN",
              data: { seatIndex, boardIndex },
            });

            return false;
          }
        });
      }
    }
    $(`.center`).prop("disabled", true);
  };

  upDateBoard = (index, symbol) => {
    $(`#button_${index}`).text(symbol);
    $(`#button_${index}`).prop("disabled", true);
  };
}
