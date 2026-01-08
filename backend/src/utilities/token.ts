import jwt from "jsonwebtoken";

// types
export interface JwtPayload {
  id: string;
  role: "user" | "admin";
}

export const signAccessToken = (payload: JwtPayload) => {
  if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET mising");
  }
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1m",
  });
};

export const signRefreshToken = (payload: JwtPayload) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_SECRET mising");
  }
  return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};
