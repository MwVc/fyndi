import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../../infrastructure/http/response.js";
import { AuthErrorCodes } from "../../../infrastructure/errors/code.errors.js";
import ApiError from "../../../infrastructure/errors/api.errors.js";
import { verifyAccessToken } from "../../../infrastructure/security/jwt/jwt_token.js";
import { logger } from "../../../infrastructure/logger/logger.js";

export const accessTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { access_token } = req.cookies;

  if (!access_token) {
    logger.info("Access Token Does Not Exist");
    return errorResponse({
      res,
      statusCode: 401,
      errorCode: AuthErrorCodes.UNAUTHORIZED,
      message: "Unauthorized",
      details: null,
    });
  }

  if (!process.env.JWT_ACCESS_SECRET) {
    throw new ApiError(
      NaN,
      AuthErrorCodes.JWT_SECRET_UNDEFINED,
      "Check .env file",
      false
    );
  }

  try {
    const userClaim = verifyAccessToken(access_token);

    // const userClaim = { userId, role };
    req.user = userClaim;
    logger.info("Access Token Check Successful");

    next();
    return;
  } catch (error) {
    logger.info("Access Token Expired");
    return errorResponse({
      res,
      statusCode: 401,
      errorCode: AuthErrorCodes.UNAUTHORIZED,
      message: "Unauthorized",
      details: null,
    });
  }
};
