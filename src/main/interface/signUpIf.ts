export interface signUpIf {
  name: string;
  isBot: boolean;
}
export interface userDetailIf {
  name: string;
  userId: number;
  socketId: string;
  isBot: boolean;
}

export interface signUpFormatIf {
  name: string;
  userId: number;
}

export interface signUpRequestIf {
  data: signUpIf;
}

export interface takeTurn {
  seatIndex: number;
  boardIndex: string;
}

export interface takeTurnRequestIf {
  data: takeTurn;
}