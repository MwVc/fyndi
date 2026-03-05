import type { Request, NextFunction, Response } from "express";
import { errorResponse } from "../../../infrastructure/http/response.js";
import { AuthErrorCodes } from "../../../infrastructure/errors/code.errors.js";

export const verifyCsrfToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const csrfCookie: string = req.cookies.csrf_token;
  const csrfHeader = req.header("X-CSRF-TOKEN");
  console.log(
    "\n\nLog from csrf middleware:\n",
    req.headers,
    "\ncsrf header: \n",
    csrfHeader,
  );

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
