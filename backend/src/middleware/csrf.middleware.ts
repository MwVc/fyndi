import type { Request, NextFunction, Response } from "express";

export const csrfProtection = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const csrfCookie: string = req.cookies.csrf_token;
  const csrfHeader = "empty string";

  if (!csrfCookie || !csrfHeader || csrfCookie !== csrfHeader) {
    return res.status(403).json({ error: "CSRF detected" });
  }

  next();
};

// module.exports = { csrfProtection };
