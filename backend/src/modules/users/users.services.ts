import type { UserClaim } from "../auth/auth.claims.js";
import { userModels } from "./users.models.js";
import ApiError from "../../infrastructure/errors/api.errors.js";
import { UserErrorCodes } from "../../infrastructure/errors/code.errors.js";

const me = async (userClaim: UserClaim) => {
  const { userId, role } = userClaim;
  const user = await userModels.getById(Number(userId));

  if (!user) {
    throw new ApiError(404, UserErrorCodes.NOT_FOUND, "User not found", true);
  }

  const safeUser = {
    firstName: user.first_name,
    lastName: user.last_name,
    id: user.id,
    role: user.role,
  };

  return safeUser;
};

export const userServices = {
  me,
};
