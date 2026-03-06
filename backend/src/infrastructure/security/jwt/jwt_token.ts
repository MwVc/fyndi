import jwt from "jsonwebtoken";
import type { UserClaim } from "../../../modules/auth/auth.claims.js";

const ACCESS_SECRET = process.env.JWT_ACCESS_SECRET;
const REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;

export const signAccessToken = (payload: UserClaim) => {
  if (!ACCESS_SECRET) {
    throw new Error("JWT_SECRET mising");
  }
  const token = jwt.sign(payload, ACCESS_SECRET, {
    expiresIn: "15m",
  });

  return {
    token: token,
    maxAge: 15 * 60 * 1000, // 15min in milliseconds
  };
};

export const signRefreshToken = (payload: UserClaim) => {
  if (!REFRESH_SECRET) {
    throw new Error("JWT_SECRET mising");
  }

  const token = jwt.sign(payload, REFRESH_SECRET, {
    expiresIn: "7d",
  });
  const createdAt = Date.now(); // milliseconds
  const maxAge = 7 * 24 * 60 * 60 * 1000;
  const expiresAt = createdAt + maxAge;

  return {
    token: token,
    createdAt: createdAt,
    maxAge: maxAge, // 7days in milliseconds
    expiresAt: expiresAt,
  };
};

export const verifyRefreshToken = (token: string): UserClaim => {
  if (!REFRESH_SECRET) {
    throw new Error("JWT_SECRET missing");
  }
  return jwt.verify(token, REFRESH_SECRET) as UserClaim;
};

export const verifyAccessToken = (token: string) => {
  if (!ACCESS_SECRET) {
    throw new Error("JWT_SECRET missing");
  }

  return jwt.verify(token, ACCESS_SECRET) as UserClaim;
};
