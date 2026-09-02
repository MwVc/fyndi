import express from "express";
import { accessTokenMiddleware } from "../auth/middlewares/verify_access_token.middleware.js";
import { me } from "./users.controller.js";

const usersRouter = express.Router();

usersRouter.get("/me", accessTokenMiddleware, me);

export default usersRouter;
