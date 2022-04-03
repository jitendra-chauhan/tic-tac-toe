class PlayerDetail {
  constructor(userId, name) {
    this.id = userId;
    this.name = name;
    this.symbol;
    this.seatIndex;
  }

  updateUserSymbol = (symbol, index) => {
    this.symbol = symbol;
    this.seatIndex = index;
  };

  getPlayerName = () => this.name;
  getPlayerSeatIndex = () => this.seatIndex;
  getPlayersymbol = (seatIndex) => {
    const gameSymbol = game.getSymbol();
    return gameSymbol[seatIndex];
  };
}
