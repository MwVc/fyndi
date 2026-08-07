import express from "express";
import { registerUser, loginUser, refreshUser } from "./auth.controller.js";
import { logoutUser } from "./auth.controller.js";
import { refreshTokenMiddleware } from "./middlewares/verify_refresh_token.middleware.js";
import googleAuthenticate from "./middlewares/googleAuthenticate.js";
import googleCallback from "./middlewares/googleCallback.js";

const authRouter = express.Router();
const frontendURL = process.env.FRONTEND_URL;

authRouter.get("/google", googleAuthenticate);

authRouter.get(
  "/google/callback",
  (req, res, next) => {
    console.log("/google/callback route hit");
    next();
  },

  googleCallback,

  (req, res, next) => {
    console.log("/google/callback after passport middleware");
    next();
  },

  (req, res) => {
    console.log(req.user);
    res.redirect(`${frontendURL}/`);
  }
);

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshTokenMiddleware, refreshUser);
authRouter.post("/logout", refreshTokenMiddleware, logoutUser);

export default authRouter;
