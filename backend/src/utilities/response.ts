import type { Response } from "express";

// standardized success API response
export const successResponse = (
  res: Response,
  statusCode: number,
  data: unknown,
  message = "",
) => {
  return res.status(statusCode).json({
    success: true,
    data, // response data
    error: null,
    message, // optional success message
  });
};

// standardized error API response
export const errorResponse = (
  res: Response,
  statusCode: number,
  errorCode: string,
  message: string = "Server Error",
  details: unknown = null,
) => {
  return res.status(statusCode).json({
    success: false,
    data: null,
    error: {
      code: errorCode, // application error code
      message, // human readable explanation
      details,
    },
    message: "", // keep top-level message empty for errors
  });
};
