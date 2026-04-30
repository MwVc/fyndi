import express from "express";
import { registerUser, loginUser, refreshUser } from "./auth.controller.js";
import { logoutUser } from "./auth.controller.js";
import { refreshTokenMiddleware } from "./middlewares/verify_refresh_token.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshTokenMiddleware, refreshUser);
authRouter.post("/logout", refreshTokenMiddleware, logoutUser);

export default authRouter;
