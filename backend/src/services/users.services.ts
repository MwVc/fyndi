import { userModels } from "../models/users.models.js";
import { authentication } from "../auth/hash.auth.js";
import ApiError from "../errors/api.errors.js";
import { UserErrorCodes } from "../errors/code.errors.js";
import { ValidationErrorCodes } from "../errors/code.errors.js";
import { signAccessToken, signRefreshToken } from "../auth/token.auth.js";
import { refreshTokenModels } from "../models/refreshToken.models.js";

// export interface RegisterUserData {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
// }

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
  const hashedPassword = await authentication.hashPassword(password);
  // console.log(hashedPassword);

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
  const isMatch = await authentication.comparePassword(password, user.password);

  if (!isMatch) {
    throw new ApiError(
      400,
      ValidationErrorCodes.INVALID_CREDENTIALS,
      "Invalid Credentials",
      true,
    );
  }

  // generate JWT
  const payload = { id: user.id, role: user.role };

  // create tokens
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const csrfToken = crypto.randomUUID();
  // console.log(csrfToken);

  //on successfull login store refreshToken to the database
  refreshTokenModels.insert(refreshToken, user.id);

  return { user, accessToken, refreshToken, csrfToken };
};

export const userServices = {
  create,
  login,
};
