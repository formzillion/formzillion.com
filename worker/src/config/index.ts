const NODE_ENV = process.env.NODE_ENV || "development";

export const fzWebappConfig = {
  production: "https://app.formzillion.com",
  development: "https://dev-app.formzillion.com",
  local: "http://localhost:3000",
} as { [key: string]: string };

export const FZ_WEBAPP_URL = fzWebappConfig[NODE_ENV];
const QUEUE_PREFIX = process.env.NODE_ENV === "production" ? "prod" : "dev";

export const bullMqConfig: any = {
  connection: {
    host: process.env.REDIS_URI || "",
    port: process.env.REDIS_PORT || 6379,
    ...(!process.env.REDIS_URI?.includes("127.0") && { tls: {} }),
  },
  prefix: `{${QUEUE_PREFIX}}-{fz}`,
};

export const fzQueues = ["fz_actions"];
