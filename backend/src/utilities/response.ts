import type { Response } from "express";

export const successResponse = <T>(res: Response, data: T, message = "") => {
  return res.json({
    success: true,
    data,
    error: null,
    message,
  });
};

export const errorResponse = (
  res: Response,
  code = 500,
  message = "Server Error",
  details = null,
) => {
  return res.status(code).json({
    success: false,
    data: null,
    error: {
      code,
      message,
      details,
    },
    message: "",
  });
};
