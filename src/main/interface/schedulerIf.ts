import { playingTableIf } from "./playingTableIf";

export interface GameStartTimerIf {
  timer: number;
  jobId: string;
  tableDetail: playingTableIf;
}
