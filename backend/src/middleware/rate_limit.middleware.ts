import rateLimit from "express-rate-limit";
import ApiError from "../errors/api.errors.js";
import { PermissionErrorCodes, UserErrorCodes } from "../errors/code.errors.js";

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // this is 5 minutes
  limit: 10, // each IP can make 10 requests as per the time window ie 5 min
  standardHeaders: true, // add 'RateLimit-*' headers to the response being sent
  legacyHeaders: false, // don't send old X-RateLimit-* headers

  handler: (req, res, next, options) => {
    const error = new ApiError(
      options.statusCode,
      PermissionErrorCodes.TOO_MANY_REQUESTS,
      "Too Many Requests",
      true,
    );
    next(error);
  },
});
