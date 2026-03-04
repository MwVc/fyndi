import { successResponse } from "../../utilities/response.js";

//importing types
import type { NextFunction, Request, Response } from "express";
import { userServices } from "./auth.service.js";

interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const registerUser = async (req: Request, res: Response) => {
  const data = req.body as RegisterUserData;

  await userServices.create(data); // awaiting service and db layer

  // don't send user data to frontend upon creation
  successResponse(res, 201, null, "user created successfully");
};

export const loginUser = async (req: Request, res: Response) => {
  // destructure email and password from req.body
  const { email, password }: { email: string; password: string } = req.body;
  // console.log("login func/controller:", email, password);

  const userData = await userServices.login(email, password);
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

// export const refreshUser = (req: Request, res: Response) => {
//   const user = req.user;
//   userServices.refresh();
// };

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
