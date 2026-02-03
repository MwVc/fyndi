import express from "express";
import type { Request, Response } from "express";
import cors from "./config/cors.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.routes.js";
import { errorMiddleware } from "./middleware/error.middleware.js";

const app = express();

// middleware
app.use(express.json());
app.use(cors);
app.use(cookieParser());

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is runnning");
});

// authRouter middleware
app.use("/auth", authRouter);

app.use(errorMiddleware);

console.log("Hello from app.ts");

export default app;
