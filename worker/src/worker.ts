import { Worker } from "bullmq";

import { Logger } from "../utils";
import { bullMqConfig } from "./config";
import processor from "./processor";

export const worker = new Worker(
  "fz_actions",
  async (job) => {
    try {
      const { data } = job;

      const processedData = await processor({
        data,
      });

      return processedData;
    } catch (error: any) {
      Logger.error(`Error in fz_actions worker: ${error.message}`);

      return {
        success: false,
        message: error.message,
      };
    }
  },
  bullMqConfig
);

worker.on("completed", (job: any, result: any) => {
  Logger.info(`For jobId: ${job.id} ${result.message}`);
});

worker.on("failed", (job: any, err: any) => {
  Logger.error(
    `For jobId: ${job.id} ${job.returnvalue?.message || job.failedReason}`
  );
});

process.on("SIGTERM", async () => {
  await worker.close();
});
