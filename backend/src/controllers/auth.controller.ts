import pool from "../db/index.js";
import bcrypt from "bcrypt";
import { signAccessToken, signRefreshToken } from "../auth/token.auth.js";
import { successResponse, errorResponse } from "../utilities/response.js";

//importing types
import type { NextFunction, Request, Response } from "express";
import {
  SystemErrorCodes,
  UserErrorCodes,
  ValidationErrorCodes,
} from "../errors/code.errors.js";
import ApiError from "../errors/api.errors.js";
interface RegisterUserData {
  name: string;
  email: string;
  password: string;
}

interface LoginUserData {
  email: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password }: RegisterUserData = req.body;
  console.log(req.body);

  try {
    // check if user exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email],
    );

    if (existingUser.rows.length > 0) {
      return errorResponse(
        res,
        400,
        UserErrorCodes.ALREADY_EXISTS,
        "User already exists",
      );
    }

    // hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // insert new user into database
    const databaseResponse = await pool.query(
      "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3) RETURNING *",
      [name, email, hashedPassword],
    );

    if (databaseResponse.rows[0]) {
      successResponse(res, 201, null, "User Created Successfully");
    }

    // throw new ApiError();
    // res.status(201).json({ user: newUser.rows[0] });
  } catch (error: any) {
    console.error(error.message);
    // res.status(500).json({ error: "Server error" });
    errorResponse(
      res,
      500,
      SystemErrorCodes.INTERNAL_SERVER_ERROR,
      "Internal Server Error",
    );
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // destructure email and password from req.body
  const { email, password }: LoginUserData = req.body;
  console.log(email, password);

  try {
    // check if user exists
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    const user = result.rows[0];

    if (!user) {
      // return res.status(400).json({ error: "Invalid email" });
      return errorResponse(
        res,
        400,
        ValidationErrorCodes.INVALID_EMAIL_FORMAT,
        "Invalid email",
      );
    }
    // compare passwords
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid password" });
    }

    // generate JWT
    const payload = { id: user.id, role: user.role };

    // create tokens
    const accessToken = signAccessToken(payload);
    const refreshToken = signRefreshToken(payload);
    const csrfToken = crypto.randomUUID();
    console.log(csrfToken);

    // send tokens as HTTP-only cookies
    res
      .cookie("access_token", accessToken, {
        httpOnly: true, // client side js can't read
        secure: true, // htpps
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refresh_token", refreshToken, {
        httpOnly: true, // client side js can't read
        secure: true, // https
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("csrf_token", csrfToken, {
        httpOnly: false, // exposing to client side js
        sameSite: "none", // cross-site request
        secure: true,
      })
      .status(200)
      .json({ message: "Logged in" });
  } catch (error) {
    next(error);
    console.error(error);
  }
};

export const logoutUser = (req: Request, res: Response) => {
  // clear all cookies
  res
    .cookie("access_token", "", {
      httpOnly: true, // client side js can't read
      secure: true, // htpps
      sameSite: "none",
      maxAge: 15 * 60 * 1000,
    })
    .cookie("refresh_token", "", {
      httpOnly: true, // client side js can't read
      secure: true, // https
      sameSite: "none",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    })
    .cookie("csrf_token", "", {
      httpOnly: false, // exposing to client side js
      sameSite: "none", // cross-site request
      secure: true,
    })
    .status(200)
    .json({ message: "Logged out" });
};
