import pool from "../db/pgPool.db.js";

interface tokenData {
  token: string;
  createdAt: number;
  maxAge: number;
  expiresAt: number;
}

const insert = async (refreshToken: tokenData, userId: string) => {
  const { rows } = await pool.query(
    "INSERT INTO refresh_tokens (user_id, token, expires_at, created_at, revoked) VALUES ($1, $2, $3, $4, $5) RETURNIN *",
    [
      userId,
      refreshToken.token,
      refreshToken.expiresAt,
      refreshToken.createdAt,
      false,
    ],
  );
};

export const refreshTokenModels = {
  insert,
};
