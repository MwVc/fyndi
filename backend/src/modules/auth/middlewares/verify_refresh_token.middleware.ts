import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../../../infrastructure/http/response.js";
import { AuthErrorCodes } from "../../../infrastructure/errors/code.errors.js";
import ApiError from "../../../infrastructure/errors/api.errors.js";
import { verifyRefreshToken } from "../../../infrastructure/security/jwt/jwt_token.js";

export const refreshTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.log("Log from verify refresh token middleware", req.cookies);
  const { refresh_token } = req.cookies;

  if (!refresh_token) {
    return errorResponse(res, 401, AuthErrorCodes.UNAUTHORIZED, "Unauthorized");
  }

  if (!process.env.JWT_REFRESH_SECRET) {
    throw new ApiError(
      NaN,
      AuthErrorCodes.JWT_SECRET_UNDEFINED,
      "Check .env file",
      false,
    );
  }

  try {
    const { userId, role } = verifyRefreshToken(refresh_token);

    // pass in the user object to controller

    const userClaim = { userId, role };
    req.user = userClaim;
    // console.log("Log from verify refresh token middleware \n", userClaim);
    next();
    // console.log("\nLog from refreshToken middleware, verify jwt:\n", userClaim);
  } catch (error) {
    // console.log(error);
    return errorResponse(res, 401, AuthErrorCodes.UNAUTHORIZED, "Unauthorized");
  }
};
