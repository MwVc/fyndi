import { successResponse } from "../../infrastructure/http/response.js";

//importing types
import type { NextFunction, Request, Response } from "express";
import { authServices } from "./auth.service.js";
import type { LoginUserInput, RegisterUserInput } from "./auth.types.js";

export const registerUser = async (req: Request, res: Response) => {
  const data = req.body as RegisterUserInput;

  await authServices.create(data); // awaiting service and db layer

  // don't send user data to frontend upon creation
  successResponse(res, 201, null, "user created successfully");
};

export const loginUser = async (req: Request, res: Response) => {
  // destructure email and password from req.body
  const userCredentials = req.body as LoginUserInput;
  // console.log("login func/controller:", req.body);

  const userData = await authServices.login(userCredentials);
  // console.log(userData);
  res
    .cookie("access_token", userData.accessToken.token, {
      httpOnly: true, // client side js can't read protect agains XSS attacks
      secure: true, // htpps
      sameSite: "none",
      maxAge: userData.accessToken.maxAge, // time in milliseconds
    })
    .cookie("refresh_token", userData.refreshToken.token, {
      httpOnly: true, // client side js can't read
      secure: true, // https
      sameSite: "none",
      maxAge: userData.refreshToken.maxAge, // time in milliseconds
    })
    .cookie("csrf_token", userData.csrfToken, {
      httpOnly: false, // exposing to client side js
      sameSite: "none", // cross-site request
      secure: true,
    });

  successResponse(res, 200, null, "Logged in");
};

export const refreshUser = (req: Request, res: Response) => {
  const user = req.user;
};

export const logoutUser = (req: Request, res: Response) => {
  // clear all cookies
  res
    .cookie("access_token", "", {
      httpOnly: true, // client side js can't read
      secure: true, // htpps
      sameSite: "none",
    })
    .cookie("refresh_token", "", {
      httpOnly: true, // client side js can't read
      secure: true, // https
      sameSite: "none",
    })
    .cookie("csrf_token", "", {
      httpOnly: false, // exposing to client side js
      sameSite: "none", // cross-site request
      secure: true,
    });

  successResponse(res, 200, null, "Logged out");
};
