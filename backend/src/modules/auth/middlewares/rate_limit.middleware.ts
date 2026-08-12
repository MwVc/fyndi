import rateLimit from "express-rate-limit";
import ApiError from "../../../infrastructure/errors/api.errors.js";
import { PermissionErrorCodes } from "../../../infrastructure/errors/code.errors.js";
const frontendURL = process.env.FRONTEND_URL;
const backendURL = process.env.BACKEND_URL;

export const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 minutes
  limit: 10, // each IP can make 10 requests as per the time window which is 5 min
  standardHeaders: true, // add 'RateLimit-*' headers to the response being sent
  legacyHeaders: false, // don't send old X-RateLimit-* headers

  handler: (req, res, next, options) => {
    const error = new ApiError(
      options.statusCode,
      PermissionErrorCodes.TOO_MANY_REQUESTS,
      "Too Many Requests",
      true
    );

    console.log("Limiter middleware");

    if (req.path === `/auth/google/callback` || req.path === "/auth/google") {
      console.log("Rate limiter has been hit\n");
      return res.redirect(`${frontendURL}/login?error=rate_limit`);
    }

    next(error);
  },
});
