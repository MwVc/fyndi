import passport from "passport";
import type { Request, NextFunction, Response } from "express";
import type { OAuthProfile } from "../../auth.types.js";

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
      const profile: OAuthProfile = {
        providerUserId: user._json.sub,
        provider: user.provider,
        email: user._json.email,
        firstName: user._json.given_name,
        lastName: user._json.family_name,
        avatar: user._json.picture,
      };
      req.oauthProfile = profile;
      next();
    }
  )(req, res, next);
};
