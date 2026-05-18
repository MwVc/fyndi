import type { Response } from "express";
import type { ErrorCode } from "../errors/code.errors.js";

// standardized success API response
export const successResponse = <T>(
  res: Response,
  statusCode: number,
  data: T,
  message: string
) => {
  return res.status(statusCode).json({
    success: true,
    data, // response data
    error: null,
    message,
    meta: { timeStamp: new Date().toISOString() }, // optional success message
  });
};

// standardized error API response
export const errorResponse = (
  res: Response,
  statusCode: number,
  errorCode: ErrorCode,
  message: string,
  details: unknown = null
) => {
  return res.status(statusCode).json({
    success: false,
    data: null,
    error: {
      code: errorCode, // application error code
      message: message ?? "Internal Server Error", // human readable explanation
      details,
    },
    message: "", // keep top-level message empty for errors
    meta: { timeStamp: new Date().toISOString() },
  });
};
