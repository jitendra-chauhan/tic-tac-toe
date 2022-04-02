import queues from "./queues";
import cancelJob from "./cancelJob";

const exportObject = {
  startJob: queues,
  cancelJob,
};

export = exportObject;
