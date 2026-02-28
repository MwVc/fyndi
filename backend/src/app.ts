import express from "express";
import type { Request, Response } from "express";
import cors from "./config/cors.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";
import { limiter } from "./middleware/rate_limit.middleware.js";
import { verifyCsrfToken } from "./middleware/csrf.middleware.js";
import { verifyAccessToken } from "./middleware/verify_access_token.middleware.js";

const app = express();

// middleware

app.use(cors);
app.use(express.json());

app.use(limiter);
app.use(cookieParser()); // parse incoming cookies and populate req.cookies

// routes
app.get(
  "/",
  verifyAccessToken,
  verifyCsrfToken,
  (req: Request, res: Response) => {
    res.send("API is runnning");
  },
);

// authRouter middleware
app.use("/auth", authRouter);

app.use(errorMiddleware);

console.log("Hello from app.ts");

export default app;
