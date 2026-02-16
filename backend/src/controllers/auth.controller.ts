import { successResponse } from "../utilities/response.js";

//importing types
import type { NextFunction, Request, Response } from "express";
import { userServices } from "../services/users.services.js";

interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = req.body as RegisterUserData;
    const user = await userServices.create(data);

    successResponse(res, 201, user, "user created successfully");
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    // destructure email and password from req.body
    const { email, password }: { email: string; password: string } = req.body;
    console.log(email, password);

    const userData = await userServices.login(email, password);
    console.log(userData);
    res
      .cookie("access_token", userData.accessToken, {
        httpOnly: true, // client side js can't read
        secure: true, // htpps
        sameSite: "none",
        maxAge: 15 * 60 * 1000,
      })
      .cookie("refresh_token", userData.refreshToken, {
        httpOnly: true, // client side js can't read
        secure: true, // https
        sameSite: "none",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .cookie("csrf_token", userData.csrfToken, {
        httpOnly: false, // exposing to client side js
        sameSite: "none", // cross-site request
        secure: true,
      });

    successResponse(res, 200, null, "Logged in");
  } catch (error) {
    next(error);
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
    });

  successResponse(res, 200, null, "Logged out");
};
