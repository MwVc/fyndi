import type { NextFunction, Request, Response } from "express";
import { errorResponse } from "../utilities/response.js";
import { AuthErrorCodes } from "../errors/code.errors.js";
import ApiError from "../errors/api.errors.js";
import jwt from "jsonwebtoken";

export const verifyRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Log from verify refresh token middleware", req.cookies);
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
    const payload = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET);

    // pass in the user object to cotroller
    req.user = {
      userId: payload.userId,
    };
    next();
    console.log("\nLog from refreshToken middleware, verify jwt:\n", user);
  } catch (error) {
    console.log(error);
    return errorResponse(res, 401, AuthErrorCodes.UNAUTHORIZED, "Unauthorized");
  }
};
