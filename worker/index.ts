import * as dotenv from "dotenv";
dotenv.config({ path: `${process.cwd()}/.env` });

import { Logger, bullMq } from "./utils";

(async () => {
  try {
    Logger.info(`Formzillion Worker Starting`);

    await bullMq.createQueues(); // Creating Queues Map

    await import("./src/worker");

    Logger.info(`Formzillion Worker Started`);
  } catch (error: any) {
    Logger.error(`Error While Started Formzillion Worker: ${error.message}`);
  }
})();
