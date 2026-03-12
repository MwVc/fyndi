import pool from "../../infrastructure/db/pgPool.db.js";

interface tokenData {
  token: string;
  createdAt: number;
  maxAge: number;
  expiresAt: number;
}

const insert = async (refreshToken: tokenData, userId: string) => {
  const { rows } = await pool.query(
    "INSERT INTO refresh_tokens (user_id, token, expires_at, created_at) VALUES ($1, $2, $3, $4) ON CONFLICT (user_id) DO UPDATE SET token = EXCLUDED.token, expires_at = EXCLUDED.expires_at, created_at = EXCLUDED.created_at RETURNING *",
    [
      userId,
      refreshToken.token,
      refreshToken.expiresAt,
      refreshToken.createdAt,
    ],
  );
  return rows[0];
};

export const refreshTokenModels = {
  insert,
};
