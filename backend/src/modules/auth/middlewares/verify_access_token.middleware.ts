import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../../../infrastructure/http/response.js";
import { AuthErrorCodes } from "../../../infrastructure/errors/code.errors.js";
import jwt from "jsonwebtoken";
import ApiError from "../../../infrastructure/errors/api.errors.js";
import { verifyAccessToken } from "../../../infrastructure/security/jwt/jwt_token.js";

export const accessTokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { access_token } = req.cookies;

  if (!access_token) {
    return errorResponse(res, 401, AuthErrorCodes.UNAUTHORIZED, "Unauthorized");
  }

  if (!process.env.JWT_ACCESS_SECRET) {
    throw new ApiError(
      NaN,
      AuthErrorCodes.JWT_SECRET_UNDEFINED,
      "Check .env file",
      false,
    );
  }

  try {
    const userClaim = verifyAccessToken(access_token);

    next();
    return;
  } catch (error) {
    console.log(error);
    return errorResponse(res, 401, AuthErrorCodes.UNAUTHORIZED, "Unauthorized");
  }
};
