import type { Request, Response } from "express";
import { errorResponse } from "../../infrastructure/http/response.js";
import { AuthErrorCodes } from "../../infrastructure/errors/code.errors.js";
import { userServices } from "./users.services.js";
import { successResponse } from "../../infrastructure/http/response.js";
import type { SafeUser } from "../auth/auth.types.js";

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

  const user = await userServices.me(userClaim);

  return successResponse<SafeUser>({
    res: res,
    statusCode: 200,
    data: user,
    message: "Success",
  });
};
