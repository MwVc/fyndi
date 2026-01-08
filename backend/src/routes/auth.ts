import express from "express";
const authRouter = express.Router();
import { registerUser, loginUser } from "../controllers/authController.js";

authRouter.post("/register", registerUser);
authRouter.post("/login", loginUser);

export default authRouter;
