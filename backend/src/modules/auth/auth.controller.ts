import {
  successResponse,
  errorResponse,
} from "../../infrastructure/http/response.js";
import type { Request, Response } from "express";
import { authServices } from "./auth.service.js";
import type {
  LoginUserInput,
  RegisterUserInput,
  SafeUser,
} from "./auth.types.js";
import type { UserClaim } from "./auth.claims.js";
import { AuthErrorCodes } from "../../infrastructure/errors/code.errors.js";

const frontendURL = process.env.FRONTEND_URL;

export const registerUser = async (req: Request, res: Response) => {
  const data = req.body as RegisterUserInput;

  await authServices.register(data); // awaiting service and db layer

  // don't send user data to frontend upon creation
  successResponse({
    res: res,
    statusCode: 201,
    data: null,
    message: "user created successfully",
  });
};

export const oauthSignIn = async (req: Request, res: Response) => {
  if (req.oauthError) {
    return res.redirect(`${frontendURL}/login?error=google`);
  }

  const user = req.oauthProfile;

  if (!user) {
    // return errorResponse({
    //   res: res,
    //   statusCode: 401,
    //   errorCode: AuthErrorCodes.UNAUTHORIZED,
    //   message: "Unauthorized",
    //   details: null,
    // });

    return res.redirect(`${frontendURL}/login?error=unauthorised`);
  }

  const userData = await authServices.signInWithOauth(user);

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

  return res.redirect(`${frontendURL}/`);
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

  return successResponse<SafeUser>({
    res: res,
    statusCode: 200,
    data: userData.safeUser,
    message: "Logged in",
  });
};

export const me = async (req: Request, res: Response) => {
  // check falsey state of req.user
  if (!req.user) {
    return errorResponse({
      res: res,
      statusCode: 401,
      errorCode: AuthErrorCodes.UNAUTHORIZED,
      message: "Unauthorized",
      details: null,
    });
  }

  const userClaim = req.user;

  const user = await authServices.me(userClaim);

  return successResponse<SafeUser>({
    res: res,
    statusCode: 200,
    data: user,
    message: "Success",
  });
};

export const refreshUser = async (req: Request, res: Response) => {
  // check falsey state of req.user
  if (!req.user) {
    return errorResponse({
      res: res,
      statusCode: 401,
      errorCode: AuthErrorCodes.UNAUTHORIZED,
      message: "Unauthorized",
      details: null,
    });
  }

  const userClaim: UserClaim = req.user;
  console.log("Log from refreshUser in auth controller:", userClaim);

  // destructure the token from cookies
  const { refresh_token } = req.cookies;

  // generates a new refresh token and store it in DB
  const tokens = await authServices.refresh(userClaim, refresh_token);

  if (!tokens) {
    return errorResponse({
      res: res,
      statusCode: 401,
      errorCode: AuthErrorCodes.UNAUTHORIZED,
      message: "Unauthorized",
      details: null,
    });
  }

  res
    .cookie("access_token", tokens.accessToken.token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: tokens.accessToken.maxAge,
    })
    .cookie("refresh_token", tokens.refreshToken.token, {
      httpOnly: true, // client side js can't read
      secure: true, // https
      sameSite: "none",
      maxAge: tokens.refreshToken.maxAge, // time in milliseconds
    })
    .cookie("csrf_token", tokens.csrfToken, {
      httpOnly: false, // exposing to client side js
      sameSite: "none", // cross-site request
      secure: true,
    });

  return successResponse({
    res: res,
    statusCode: 200,
    data: null,
    message: "Refresh successful",
  });
};

export const logoutUser = async (req: Request, res: Response) => {
  // destructure token
  const { refresh_token } = req.cookies;

  await authServices.logout(refresh_token);

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

  return successResponse({
    res,
    statusCode: 200,
    data: null,
    message: "Logged out",
  });
};
