import type { Request, Response, NextFunction } from "express";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // destructure cookies to get the tokens
  console.log(req.cookies);
};
