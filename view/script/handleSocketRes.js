class HandleSocketRes {
  signUp = (eventData) => {
    userId = eventData.userId;
    const { name } = eventData;
    const message = `hello ${name}`;
    $("#userHello").html(message);
    playerDetail = new PlayerDetail(userId, name);
  };

  updateUserCount = (totalPlayers) => {
    userCount = totalPlayers;
  };

  gameTableInfo = (eventData) => {
    const { seatIndex, symbol, totalPlayers, maxPlayers, id } = eventData;
    maxUserCount = maxPlayers;
    const userSymbol = symbol[seatIndex];
    playerDetail.updateUserSymbol(userSymbol, seatIndex);
    game = new Game(id,symbol);
    game.displayGameBoard();
    this.updateUserCount(totalPlayers);
  };

  handleJoinTable = (eventData) => {
    const { totalPlayers, playarDetail } = eventData;

    const message = `${playarDetail.name}`;
    $("#apo").html(message);

    this.updateUserCount(totalPlayers);
  };

  gameStartTimer = (eventData) => {
    let { time } = eventData;

    const setIntTime = setInterval(() => {
      time -= 1;
      $("#time").html(`${time}`);

      if (time === 0) {
        
        clearInterval(setIntTime);
        if (userCount === maxUserCount) {
          $("#time").html(``);
          $(`.center`).prop('disabled',true);
         
        }
      }
    }, 1000);
  };

  startTurnTimer = (eventData) => {
    let { timer, index } = eventData;

    if (index === playerDetail.getPlayerSeatIndex()) {
      $(`.center`).prop('disabled',false);
      $("#turn").html(`Start Your Turn Timer`);
    } else {
      $("#turn").html(`Start Your opponent Turn Timer`);
    }

    const setIntTime = setInterval(() => {
      timer -= 1;
      $("#time").html(`${timer}`);

      if (timer === 0) {
        clearInterval(setIntTime);
        $("#time").html(``);
      }
    }, 1000);

    if (userCount === maxUserCount) {
      $("#time").html(``);
      $(`.center`).prop('disabled',true);
      if(!isBoardCreated) {
        isBoardCreated = true;
        game.createBoard();
      }
    }
  };

  showTakeTurnMove = (eventData) => {
    const { boardIndex, index, isTimeOut } = eventData;

    if (index === playerDetail.getPlayerSeatIndex() && isTimeOut) {
      $("#turn").html(`Your Turn TimerOut`);
    } else if (isTimeOut) {
      $("#turn").html(`Your opponent Turn TimerOut`);
    }
    const symbol = playerDetail.getPlayersymbol(index)

    game.upDateBoard(boardIndex,symbol);
  }

  winner = (eventData) => {
    const { index, tie } = eventData;
    let messgae;
    if (tie) {
      messgae = 'game Tie!'
    }else if(index === playerDetail.getPlayerSeatIndex()){
      messgae = 'you are the winner.'
    }else{
      messgae = 'opponent is winner.'
    }

    alert(messgae);
  }
}
