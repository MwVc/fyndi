import pool from "../db/pgPool.db.js";

interface tokenData {
  token: string;
  createdAt: number;
  maxAge: number;
  expiresAt: number;
}

const insert = async (refreshToken: tokenData, userId: string) => {
  const { rows } = await pool.query(
    "INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES ($1, $2, $3, $4) RETURNING *",
    [
      userId,
      refreshToken.token,
      refreshToken.expiresAt,
      refreshToken.createdAt,
    ],
  );
  return rows;
};

export const refreshTokenModels = {
  insert,
};
