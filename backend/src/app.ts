import express from "express";
import type { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

// middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req: Request, res: Response) => {
  res.send("API is runnning");
});

export default app;
