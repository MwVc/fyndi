import type { Request, Response, NextFunction } from "express";

export const verifyAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(req.cookies);
  // destructure cookies to get the tokens
  // verify token using bcrypt
  next();
};
