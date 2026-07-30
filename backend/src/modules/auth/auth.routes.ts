import express from "express";
import { registerUser, loginUser, refreshUser } from "./auth.controller.js";
import { logoutUser } from "./auth.controller.js";
import { refreshTokenMiddleware } from "./middlewares/verify_refresh_token.middleware.js";
import passport from "passport";

const authRouter = express.Router();
const frontendURL = process.env.FRONTEND_URL;

authRouter.get(
  "/google",
  (req, res, next) => {
    console.log("/google route hit");
    next();
  },
  passport.authenticate("google", {
    scope: ["email", "profile"],
    session: false,
    prompt: "select_account consent", // force google to show account selection & permission screen
  })
);
authRouter.get(
  "/google/callback",
  (req, res, next) => {
    console.log("/google/callback route hit");
    next();
  },
  passport.authenticate("google", {
    session: false,
  }),
  (req, res, next) => {
    console.log("/google/callback after passport middleware");
    next();
  },

  (req, res) => {
    console.log(req.user);
    res.redirect(`${frontendURL}/login`);
  }
);
authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshTokenMiddleware, refreshUser);
authRouter.post("/logout", refreshTokenMiddleware, logoutUser);

export default authRouter;
