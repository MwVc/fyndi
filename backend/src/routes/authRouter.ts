import express from "express";
import { registerUser, loginUser } from "../controllers/authController.js";

const authRouter = express.Router();

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);
authRouter.post("/logout", (req, res) =>
  res.status(200).json({ status: "success", message: "Logged out" })
);

export default authRouter;
