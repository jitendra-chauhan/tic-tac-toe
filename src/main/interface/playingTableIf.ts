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
