import type { NextFunction, Response, Request } from "express";

interface MyError extends Error {
  status?: number;
}

export const errorMiddleware = (
  err: MyError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.message);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
};
