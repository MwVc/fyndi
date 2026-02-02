import { type NextFunction, type Response, type Request } from "express";
import ApiError from "../errors/customErrors.js";
import { errorResponse } from "../utilities/response.js";
import { SystemErrorCodes } from "../errors/errorCodes.js";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // handle internal ApiError
  if (err instanceof ApiError) {
    console.log("The error came from ApiError");

    errorResponse(res, err.statusCode, err.errorCode, err.message);
    console.log(err);
    return;
  }

  errorResponse(
    res,
    500,
    SystemErrorCodes.INTERNAL_SERVER_ERROR,
    "Internal Server Error",
  );
};
