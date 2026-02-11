import { userModels } from "../models/users.models.js";
import { authentication } from "../auth/hash.auth.js";
import ApiError from "../errors/api.errors.js";
import { UserErrorCodes } from "../errors/code.errors.js";
import { ValidationErrorCodes } from "../errors/code.errors.js";
import { signAccessToken, signRefreshToken } from "../auth/token.auth.js";

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
  const hashedPassword = await authentication.hashPassword(password);
  console.log(hashedPassword);

  // utilise try/catch to catch user exists error
  try {
    const user = await userModels.insert({
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

const login = async (email: string, password: string) => {
  // get user from database
  const user = await userModels.getByEmail(email);
  console.log(user);
  if (!user) {
    throw new ApiError(
      400,
      ValidationErrorCodes.INVALID_EMAIL_FORMAT,
      "Invalid Email",
      true,
    );
  }

  // validate password
  const isMatch = await authentication.comparePassword(password, user.password);

  if (!isMatch) {
    throw new ApiError(
      400,
      ValidationErrorCodes.INVALID_PASSWORD_FORMAT,
      "Invalid password",
      true,
    );
  }

  // generate JWT
  const payload = { id: user.id, role: user.role };

  // create tokens
  const accessToken = signAccessToken(payload);
  const refreshToken = signRefreshToken(payload);
  const csrfToken = crypto.randomUUID();
  console.log(csrfToken);

  return { user, accessToken, refreshToken, csrfToken };
};

export const userServices = {
  create,
  login,
};
