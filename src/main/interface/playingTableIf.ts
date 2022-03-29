export interface playingTableIf {
  id: number;
  tableState: string;
  seats: any;
  totalPlayers: number;
  maxPlayers: number;
  currentTurn: number | null;
  bord: any;
}
interface playarDetailIf {
  seatIndex: number;
  userId: number;
  name: string;
}
export interface JoinTableInfoFormatIf {
  totalPlayers: number;
  playarDetail: playarDetailIf;
}

interface IObjectKeys {
  [key: string]: any;
}

export interface userPlayingSeatIf {
  name: string;
  userId: number;
  seatIndex: number;
  isBot: boolean;
}
export interface usersSeatsIf extends IObjectKeys{
  s0:userPlayingSeatIf,
  s1:userPlayingSeatIf,
  s2:userPlayingSeatIf,
  s3:userPlayingSeatIf,
}
