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
import { claims } from "./auth.claims.js";

const create = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
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

const login = async (email: string, password: string) => {
  // sanitize emailinput
  const sanitizedEmail = email.trim().toLocaleLowerCase();

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
  const isMatch = await comparePassword(password, user.password);

  if (!isMatch) {
    throw new ApiError(
      400,
      ValidationErrorCodes.INVALID_CREDENTIALS,
      "Invalid Credentials",
      true,
    );
  }

  // create userPayload
  const userClaim = claims.createClaims(user);
  // const payload = { userId: user.id, email: user.email };

  // create tokens
  const accessToken = signAccessToken(userClaim);
  const refreshToken = signRefreshToken(userClaim);
  const csrfToken = crypto.randomUUID();

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

// const refresh = ({ id, email }) => {
//   // get user by id from db
//   // create tokens
//   const accessToken = signAccessToken;
// };

export const authServices = {
  create,
  login,
  // refresh,
};
