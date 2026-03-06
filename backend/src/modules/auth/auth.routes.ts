import express from "express";
import { registerUser, loginUser } from "./auth.controller.js";
import { logoutUser } from "./auth.controller.js";
import { refreshTokenMiddleware } from "./middlewares/verify_refresh_token.middleware.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/refresh", refreshTokenMiddleware, (req, res) => {
  console.log("refresh endpont being hit");
  res.send("The check was succesfull and the refresh token works");
});
authRouter.post("/logout", logoutUser);

export default authRouter;
