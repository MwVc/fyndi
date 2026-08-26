import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../../../infrastructure/http/response.js";
import { AuthErrorCodes } from "../../../infrastructure/errors/code.errors.js";
import ApiError from "../../../infrastructure/errors/api.errors.js";
import { verifyRefreshToken } from "../../../infrastructure/security/jwt/jwt_token.js";

export const refreshTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log("Refresh token middleware hit");

  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    return errorResponse({
      res,
      statusCode: 401,
      errorCode: AuthErrorCodes.UNAUTHORIZED,
      message: "Unauthorized",
      details: null,
    });
  }

  if (!process.env.JWT_REFRESH_SECRET) {
    throw new ApiError(
      NaN,
      AuthErrorCodes.JWT_SECRET_UNDEFINED,
      "Check .env file",
      false
    );
  }

  try {
    // verify if the refresh_token is valid
    const { userId, role } = verifyRefreshToken(refresh_token);

    const userClaim = { userId, role };
    req.user = userClaim;

    next();
  } catch (error) {
    return errorResponse({
      res,
      statusCode: 401,
      errorCode: AuthErrorCodes.UNAUTHORIZED,
      message: "Unauthorized",
      details: null,
    });
  }
};
