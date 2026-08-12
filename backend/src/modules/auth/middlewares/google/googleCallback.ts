import passport from "passport";
import type { Request, NextFunction, Response } from "express";

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
        console.log(err);
        res.redirect(`${frontendURL}/login?error=google`);
        // next(err);
        return;
      }

      if (!user) {
        res.redirect(`${frontendURL}/login?error=unauthorised`);
        return;
      }
      next();
    }
  )(req, res, next);
};
