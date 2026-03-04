import { type NextFunction, type Response, type Request } from "express";
import ApiError from "../../errors/api.errors.js";
import { errorResponse } from "../../utilities/response.js";
import { SystemErrorCodes } from "../../errors/code.errors.js";

export const errorMiddleware = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // handle internal ApiError
  if (err instanceof ApiError) {
    console.log("The error is instance of ApiError");
    // log internally
    if (!err.expose) {
      console.error({
        message: err.message,
        errorCode: err.errorCode,
        stack: err.stack,
      });
    }

    if (err.expose) {
      console.log(err);
      return errorResponse(res, err.statusCode, err.errorCode, err.message);
    }
  }

  console.log("This is from error middleware", err); // debugging

  return errorResponse(
    // fallback error for non ApiError
    res,
    500,
    SystemErrorCodes.INTERNAL_SERVER_ERROR,
    "Internal Server Error",
  );
};
