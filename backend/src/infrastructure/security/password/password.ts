import bcrypt from "bcrypt";
import ApiError from "../../errors/api.errors.js";
import { SystemErrorCodes } from "../../errors/code.errors.js";

export const hashPassword = async (password: string): Promise<string> => {
  // hash password
  const saltRounds = 10;
  try {
    const hash = await bcrypt.hash(password, saltRounds);
    return hash;
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      SystemErrorCodes.PASSWORD_HASH_FAILED,
      "Internal Server Error",
      false,
      error
    );
  }
};

export const comparePassword = async (
  plainPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    return isMatch;
  } catch (error) {
    console.log(error);
    throw new ApiError(
      500,
      SystemErrorCodes.PASSWORD_COMPARE_FAILED,
      "Internal Server Error",
      false,
      error
    );
  }
};
