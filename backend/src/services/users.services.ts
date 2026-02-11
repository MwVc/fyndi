import { models } from "../models/users.models.js";
import { hashPassword } from "../auth/hash.auth.js";
import ApiError from "../errors/api.errors.js";
import { SystemErrorCodes, UserErrorCodes } from "../errors/code.errors.js";
import { error } from "node:console";
import { errorResponse } from "../utilities/response.js";

export interface RegisterUserData {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  hashedPassword?: string;
}

const create = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterUserData) => {
  const hashedPassword = await hashPassword(password);
  console.log(hashedPassword);

  // utilise try/catch to catch user exists error
  try {
    const user = await models.insert({
      firstName,
      lastName,
      email,
      hashedPassword,
    });

    return user;
  } catch (error: any) {
    if (error.code === "23505") {
      throw new ApiError(
        400,
        UserErrorCodes.EMAIL_EXISTS,
        "email exists",
        true,
      );
    }

    throw error;
  }
};

export const users = {
  create,
};
