import passport from "passport";
import type { Request, NextFunction, Response } from "express";
import { AuthErrorCodes } from "../../../infrastructure/errors/code.errors.js";
import { errorResponse } from "../../../infrastructure/http/response.js";

const frontendURL = process.env.FRONTEND_URL;

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    "google",
    {
      session: false, // do not log user into passport session
    },

    (err, user) => {
      console.log("(err, user) callback function has been called");

      if (err) {
        res.redirect(`${frontendURL}/login?error=google`);
        next(err);
        return;
      }

      if (!user) {
        res.redirect(`${frontendURL}/login?error=unauthorised`);

        return errorResponse(
          res,
          401,
          AuthErrorCodes.UNAUTHORIZED,
          "Unauthorized"
        );
      }

      req.user = user;
      next();
    }
  )(req, res, next);
};
