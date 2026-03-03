import jwt from "jsonwebtoken";

// types
export interface JwtPayload {
  userId: string;
  email: string;
}

export const signAccessToken = (payload: JwtPayload) => {
  if (!process.env.JWT_ACCESS_SECRET) {
    throw new Error("JWT_SECRET mising");
  }
  const token = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
    expiresIn: "15m",
  });

  return {
    token: token,
    maxAge: 15 * 60 * 1000, // 15min in milliseconds
  };
};

export const signRefreshToken = (payload: JwtPayload) => {
  if (!process.env.JWT_REFRESH_SECRET) {
    throw new Error("JWT_SECRET mising");
  }

  const token = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
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
