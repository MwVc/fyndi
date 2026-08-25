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
import type {
  LoginUserInput,
  OAuthProfile,
  RegisterUserInput,
} from "./auth.types.js";
import type { DatabaseUser } from "../users/users.types.js";

const register = async ({
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
    const user: DatabaseUser = await userModels.insert({
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

const signInWithOauth = async (profile: OAuthProfile) => {
  // sanitize email input
  const sanitizedEmail = profile.email.trim().toLocaleLowerCase();

  //check if user exists
  const user = await userModels.getByEmail(sanitizedEmail);
  // console.log("users/services:", email, password, user);

  // if user does not exist insert new user
  if (!user) {
    try {
      const user: DatabaseUser = await userModels.insert({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email: sanitizedEmail,
        password: null,
      });

      console.log(user);

      return completeSignIn(user);
    } catch (error: any) {
      // if (error.code === "23505") {
      //   throw new ApiError(400, UserErrorCodes.USER_EXISTS, "User Exists", true);
      // }
      throw error;
    }
  }
};

const login = async (userCredentials: LoginUserInput) => {
  // sanitize emailinput
  const sanitizedEmail = userCredentials.email.trim().toLocaleLowerCase();

  // get user from database
  const user = await userModels.getByEmail(sanitizedEmail);
  // console.log("users/services:", email, password, user);

  if (!user || !user.password) {
    throw new ApiError(
      400,
      ValidationErrorCodes.INVALID_CREDENTIALS,
      "Invalid Credentials",
      true
    );
  }

  // validate password
  const isMatch = await comparePassword(
    userCredentials.password,
    user.password
  );

  if (!isMatch) {
    throw new ApiError(
      400,
      ValidationErrorCodes.INVALID_CREDENTIALS,
      "Invalid Credentials",
      true
    );
  }

  return completeSignIn(user);
};

const refresh = async (userClaim: UserClaim, refresh_token: string) => {
  console.log("Log from auth.service\n, User claim:", userClaim);

  // check if the refresh token exists in db
  const getTokenResponse: boolean = await refreshTokenModels.getToken(
    refresh_token,
    userClaim.userId
  );

  if (!getTokenResponse) {
    console.log("getTokenResponse is false");

    // delete token
    const rowCount = await refreshTokenModels.deleteToken(refresh_token);

    return null;
  }

  const { accessToken, refreshToken, csrfToken } =
    generateUserTokens(userClaim);

  const inserTokenResponse = await refreshTokenModels.insertToken(
    refreshToken,
    userClaim.userId
  );

  if (!inserTokenResponse) {
    throw new Error("Failed to store refresh token");
  }

  return { accessToken, refreshToken, csrfToken };
};

const logout = async (refresh_token: string) => {
  await refreshTokenModels.deleteToken(refresh_token);
  return;
};

const generateUserTokens = (userClaim: UserClaim) => {
  const accessToken = signAccessToken(userClaim);
  const refreshToken = signRefreshToken(userClaim);
  const csrfToken = crypto.randomUUID();

  return { accessToken, refreshToken, csrfToken };
};

const completeSignIn = async (user: DatabaseUser) => {
  const {
    first_name: firstName,
    last_name: lastName,
    created_at,
    ...remainingData
  } = user;

  const safeUser = { firstName, lastName, ...remainingData }; // create user object that can be exposed to the client

  // create user claim
  const userClaim = claims.createClaims(user);

  // create tokens
  const { accessToken, refreshToken, csrfToken } =
    generateUserTokens(userClaim);

  // on successfull login store refreshToken to the database
  const inserTokenResponse = await refreshTokenModels.insertToken(
    refreshToken,
    user.id
  );

  if (!inserTokenResponse) {
    throw new Error("Failed to store refresh token");
  }

  return { safeUser, accessToken, refreshToken, csrfToken };
};

export const authServices = {
  register,
  signInWithOauth,
  login,
  refresh,
  logout,
};
