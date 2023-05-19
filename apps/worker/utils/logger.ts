import pino from "pino";
import pretty from "pino-pretty";

// JSON format is the default format in pino logger
let Logger = pino({
  level: "info",
});

// Pretty format the logs only in local environment
if (process.env.NODE_ENV !== "production") {
  const stream = pretty({ colorize: true });
  Logger = pino(stream);
}

export default Logger;
