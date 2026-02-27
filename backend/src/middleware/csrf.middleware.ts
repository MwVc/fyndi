import type { Request, NextFunction, Response } from "express";
import { errorResponse } from "../utilities/response.js";
import { AuthErrorCodes } from "../errors/code.errors.js";

export const verifyCsrfToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.log("csrf middleware log:", req.headers);
  const csrfCookie: string = req.cookies.csrf_token;
  const csrfHeader = req.header("X-CSRF-TOKEN");

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return errorResponse(
      res,
      403,
      AuthErrorCodes.CSRF_TOKEN_INVALID,
      "Forbidden",
    );
  }

  next();
};
