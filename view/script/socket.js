const socket = io("http://localhost:4000/socket");

let userId;
let userCount;
let playerDetail;
let game;
let handleSocketRes;
let maxUserCount;
let isBoardCreated = false;

socket.on("connect", function () {
  $("#play").on("click", function () {
    handleSocketRes = new HandleSocketRes();
    const name = $("#userName").val();
    if (!name) {
      alert("Please Enter The Name.");
    } else {
      socket.emit("req", { en: "SIGN_UP", data: { name } });
    }
  });
});
socket.on("res", function (responce) {
  const { data } = responce;
  const event = data.en;
  const eventData = data.data;

  switch (event) {
    case "SIGN_UP":
      handleSocketRes.signUp(eventData);
      break;
    case "GET_TABLE_INFO":
      handleSocketRes.gameTableInfo(eventData);
      break;
    case "JOIN_TABLE":
      handleSocketRes.handleJoinTable(eventData);
      break;
    case "GAME_START":
      handleSocketRes.gameStartTimer(eventData);
      break;
    case "START_TURN":
      handleSocketRes.startTurnTimer(eventData);
      break;
    case "SHOW_TAKE_TURN":
      handleSocketRes.showTakeTurnMove(eventData);
      break;
    case "WINNER":
      handleSocketRes.winner(eventData);
      break;
    default:
      break;
  }
});
socket.on("error", function (d) {
  alert("socket connection Error");
});
