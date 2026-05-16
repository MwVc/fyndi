import { type DatabaseUser } from "../users/users.types.js";

export interface UserClaim {
  userId: string;
  role: string;
}

const createClaims = (user: DatabaseUser): UserClaim => {
  return { userId: user.id, role: user.role };
};

export const claims = {
  createClaims,
};
