import pino, { destination } from "pino";
import path from "node:path";

const logFile = path.join(process.cwd(), "logs", "app.log");

export const logger = pino({
  base: null,
  level: process.env.PINO_LOG_LEVEL ?? "info",

  transport: {
    targets: [
      {
        target: "pino/file",
        options: {
          destination: 1,
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
          dateFormat: "dd-MM-yyyy",
        },
      },
    ],
  },
});
