import "./infrastructure/config/env.js";
import express from "express";
import type { Request, Response } from "express";
import cors from "./infrastructure/config/cors.js";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/auth.routes.js";
import { errorMiddleware } from "./infrastructure/middlewares/error.middleware.js";
import { limiter } from "./modules/auth/middlewares/rate_limit.middleware.js";
import { verifyCsrfToken } from "./modules/auth/middlewares/csrf.middleware.js";
import { accessTokenMiddleware } from "./modules/auth/middlewares/verify_access_token.middleware.js";
import { successResponse } from "./infrastructure/http/response.js";

const app = express();

// middleware

app.use(cors);
app.use(express.json());
app.use(limiter);
app.use(cookieParser()); // parse incoming cookies and populate req.cookies

// routes
app.get(
  "/",
  verifyCsrfToken,
  accessTokenMiddleware,

  (req: Request, res: Response) => {
    successResponse(
      res,
      200,
      { message: "Root hit successful" },
      "Successful Response"
    );
  }
);

// authRouter middleware
app.use("/auth", authRouter);
// app.use("/user", userRouter);

app.use(errorMiddleware);

export default app;
