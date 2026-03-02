import type { Request, Response, NextFunction } from "express";
import { errorResponse } from "../utilities/response.js";
import { AuthErrorCodes } from "../errors/code.errors.js";
import jwt from "jsonwebtoken";
import ApiError from "../errors/api.errors.js";

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("Log from verifyAccessToken middleware", req.cookies);
  const { access_token } = req.cookies;
  console.log("Log from verifyAccessToken middleware", access_token);

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
    const user = jwt.verify(access_token, process.env.JWT_ACCESS_SECRET);

    next();
  } catch (error) {
    console.log(error);
    return errorResponse(res, 401, AuthErrorCodes.UNAUTHORIZED, "Unauthorized");
  }

  // destructure cookies to get the tokens
  // verify token using bcrypt
  // next();
};
