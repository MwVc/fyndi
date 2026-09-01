import express from "express";
import {
  registerUser,
  loginUser,
  refreshUser,
  oauthSignIn,
  me,
} from "./auth.controller.js";
import { logoutUser } from "./auth.controller.js";
import { refreshTokenMiddleware } from "./middlewares/verify_refresh_token.middleware.js";
import googleAuthenticate from "./middlewares/google/googleAuthenticate.js";
import googleCallback from "./middlewares/google/googleCallback.js";
import { accessTokenMiddleware } from "./middlewares/verify_access_token.middleware.js";

const authRouter = express.Router();

authRouter.get("/google", googleAuthenticate);

authRouter.get(
  "/google/callback",
  (req, res, next) => {
    console.log("/google/callback route hit");
    next();
  },

  googleCallback,

  oauthSignIn
);

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshTokenMiddleware, refreshUser);
authRouter.get("/me", accessTokenMiddleware, me);
authRouter.post("/logout", refreshTokenMiddleware, logoutUser);

export default authRouter;
