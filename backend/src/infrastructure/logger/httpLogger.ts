import { pinoHttp } from "pino-http";
import { logger } from "./logger.js";

export const httpLogger = pinoHttp({
  logger,
  serializers: {
    req(req) {
      return {
        origin: req.headers.origin,
        id: req.id,
        method: req.method,
        url: req.url,
      };
    },

    res(res) {
      return {
        statusCode: res.statusCode,
      };
    },
  },
});
