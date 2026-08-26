import type { Request, NextFunction, Response } from "express";
import { errorResponse } from "../../../infrastructure/http/response.js";
import { AuthErrorCodes } from "../../../infrastructure/errors/code.errors.js";

export const verifyCsrfToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const csrfCookie: string = req.cookies.csrf_token;
  const csrfHeader = req.header("X-CSRF-TOKEN");

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return errorResponse({
      res,
      statusCode: 403,
      errorCode: AuthErrorCodes.CSRF_TOKEN_INVALID,
      message: "Forbidden",
      details: null,
    });
  }

  next();
};
