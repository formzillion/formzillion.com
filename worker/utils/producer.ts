import { Queue } from "bullmq";

import { bullMqConfig, fzQueues } from "../src/config";

const queueName = fzQueues[0];

const fzQueue = new Queue(queueName, bullMqConfig);

interface IFzProducerData {
  eventName: string;
  eventData: {
    [key: string]: any;
  };
}

export default async function (data: IFzProducerData) {
  console.log("data: ", data);
  let producerResp = {};

  try {
    const response = await fzQueue.add(queueName, data, {
      removeOnFail: { count: 15 },
      removeOnComplete: { count: 5 },
    });

    producerResp = {
      success: true,
      message: `Data added to the ${queueName} with Id: ${response?.id}`,
    };
  } catch (e: any) {
    producerResp = {
      success: false,
      message: `Failed to add data to ${queueName} due to ${e?.message}`,
    };
  }

  return producerResp;
}
