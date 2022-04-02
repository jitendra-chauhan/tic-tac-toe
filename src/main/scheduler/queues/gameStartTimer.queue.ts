import { GameStartTimerIf } from "../../interface/schedulerIf";
import logger from "../../logger";
import { gameStartTimerProcess } from "../processes";
import QueueBaseClass from "./queueBaseClass";

class GameStartTimerQueue extends QueueBaseClass {
  constructor() {
    super("gameStartTimer");
    this.queue.process(gameStartTimerProcess);
  }

  gameStartTimerQueue = (data: GameStartTimerIf) => {
    try {
      const queueOption = {
        dealy: data.timer,
        jobId: data.jobId,
        removeOnComplete: true,
      };
      this.queue.add(data, queueOption);
    } catch (error) {
      logger.error("GameStartTimerQueue : error :: ", error);
    }
  };
}
export = new GameStartTimerQueue().gameStartTimerQueue;
