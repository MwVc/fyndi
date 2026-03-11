import { userModels } from "../users/users.models.js";
import {
  hashPassword,
  comparePassword,
} from "../../infrastructure/security/password/password.js";
import ApiError from "../../infrastructure/errors/api.errors.js";
import { UserErrorCodes } from "../../infrastructure/errors/code.errors.js";
import { ValidationErrorCodes } from "../../infrastructure/errors/code.errors.js";
import {
  signAccessToken,
  signRefreshToken,
} from "../../infrastructure/security/jwt/jwt_token.js";
import { refreshTokenModels } from "./refreshToken.models.js";
import { claims, type UserClaim } from "./auth.claims.js";
import type { LoginUserInput, RegisterUserInput } from "./auth.types.js";

const create = async ({
  firstName,
  lastName,
  email,
  password,
}: RegisterUserInput) => {
  // sanitize email input
  const sanitizedEmail = email.trim().toLocaleLowerCase();

  // hash password
  const hashedPassword = await hashPassword(password);

  // utilise try/catch to catch user exists error
  try {
    const user = await userModels.insert({
      firstName,
      lastName,
      email: sanitizedEmail,
      password: hashedPassword,
    });

    return user;
  } catch (error: any) {
    if (error.code === "23505") {
      throw new ApiError(400, UserErrorCodes.USER_EXISTS, "User Exists", true);
    }

    throw error;
  }
};

const login = async (userCredentials: LoginUserInput) => {
  // sanitize emailinput
  const sanitizedEmail = userCredentials.email.trim().toLocaleLowerCase();

  // get user from database
  const user = await userModels.getByEmail(sanitizedEmail);
  // console.log("users/services:", email, password, user);

  if (!user) {
    throw new ApiError(
      400,
      ValidationErrorCodes.INVALID_CREDENTIALS,
      "Invalid Credentials",
      true,
    );
  }

  // validate password
  const isMatch = await comparePassword(
    userCredentials.password,
    user.password,
  );

  if (!isMatch) {
    throw new ApiError(
      400,
      ValidationErrorCodes.INVALID_CREDENTIALS,
      "Invalid Credentials",
      true,
    );
  }

  // create user claim
  const userClaim = claims.createClaims(user);

  // create tokens
  const { accessToken, refreshToken, csrfToken } =
    generateUserTokens(userClaim);

  // on successfull login store refreshToken to the database
  const inserTokenResponse = await refreshTokenModels.insert(
    refreshToken,
    user.id,
  );

  if (!inserTokenResponse) {
    throw new Error("Failed to store refresh token");
  }

  return { user, accessToken, refreshToken, csrfToken };
};

const refresh = async (userClaim: UserClaim) => {
  // get user by id from db
  // create tokens
  console.log("Log from auth.service\n", userClaim);
  const { accessToken, refreshToken, csrfToken } =
    generateUserTokens(userClaim);

  const inserTokenResponse = await refreshTokenModels.insert(
    refreshToken,
    userClaim.userId,
  );

  if (!inserTokenResponse) {
    throw new Error("Failed to store refresh token");
  }

  return { accessToken, refreshToken, csrfToken };
};

const generateUserTokens = (userClaim: UserClaim) => {
  const accessToken = signAccessToken(userClaim);
  const refreshToken = signRefreshToken(userClaim);
  const csrfToken = crypto.randomUUID();

  return { accessToken, refreshToken, csrfToken };
};

export const authServices = {
  create,
  login,
  refresh,
};
