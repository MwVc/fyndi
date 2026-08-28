import pino from "pino";
import path from "node:path";

const logFile = path.join(process.cwd(), "logs", "app.log");

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  // base: undefined,

  // timestamp: () => `,"time":"${new Date().toISOString()}"`,
  transport: {
    targets: [
      {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid, hostname",
        },
      },
      {
        target: "pino-roll",
        level: "info",
        options: {
          file: logFile,
          frequency: "daily",
          size: "10m",
          mkdir: true,
          dateFormat: "yyyy-MM-dd",
        },
      },
    ],
  },
});
