import logger from "../../logger";
import QueueBaseClass from "../queues/queueBaseClass";

class TurnStartTimerCancel extends QueueBaseClass {
  constructor() {
    super("turnStartTimer");
  }

  turnStartTimerCancel = async (jobId: string) => {
    try {
      const jobData = await this.queue.getJob(jobId);
      if(jobData)
      jobData.remove();
    } catch (error) {
      logger.error("TurnStartTimerCancel : error :: ", error);
    }
  };
}
export = new TurnStartTimerCancel().turnStartTimerCancel;
