import { Queue } from "bullmq";

import { bullMqConfig, fzQueues } from "../src/config";
import Logger from "./logger";

export const queuesMap: any = {};

export const createQueues = () => {
  try {
    fzQueues.forEach((queueName) => {
      queuesMap[queueName] = new Queue(queueName, bullMqConfig);
    });

    return queuesMap;
  } catch (error) {
    Logger.error(
      `Error in creating BullMq Producer for Queue - ${error.message}`
    );

    return {};
  }
};

export default {
  createQueues,
};
