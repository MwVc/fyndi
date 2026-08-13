import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import ApiError from "../../../infrastructure/errors/api.errors.js";
import { AuthErrorCodes } from "../../../infrastructure/errors/code.errors.js";

const clientID = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
const callbackURL = process.env.GOOGLE_CALLBACK_URL;

if (!clientID || !clientSecret || !callbackURL) {
  throw new ApiError(
    500,
    AuthErrorCodes.TOKEN_MISSING,
    "Missing Google Oauth environment variables",
    false
  );
}

passport.use(
  new GoogleStrategy(
    {
      clientID,
      clientSecret,
      callbackURL,
    },

    async (accessToken: any, refreshToken: any, profile: any, done: any) => {
      try {
        console.log("google strategy hit\n");
        console.log(profile);

        return done(null, profile);
      } catch (error) {
        done(error);
      }
    }
  )
);
