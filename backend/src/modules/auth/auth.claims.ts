import { type User } from "../users/types.js";

export interface UserClaim {
  userId: string;
  role: string;
}

const createClaims = (user: User): UserClaim => {
  return { userId: user.id, role: user.role };
};

export const claims = {
  createClaims,
};
