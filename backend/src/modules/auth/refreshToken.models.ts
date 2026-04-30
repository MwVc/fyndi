import type { QueryResult } from "pg";
import pool from "../../infrastructure/db/pgPool.db.js";

interface tokenData {
  token: string;
  createdAt: number;
  maxAge: number;
  expiresAt: number;
}

const insertToken = async (refreshToken: tokenData, userId: string) => {
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

const getToken = async (refresh_token: string, user_id: string) => {
  const { rows } = await pool.query(
    "SELECT EXISTS (SELECT 1 FROM refresh_tokens WHERE token = $1 AND user_id = $2)",
    [refresh_token, user_id],
  );

  return rows[0].exists;
};

const deleteToken = async (refresh_token: string) => {
  const { rowCount } = await pool.query(
    "DELETE FROM refresh_tokens WHERE token = $1",
    [refresh_token],
  );

  return rowCount;
};

export const refreshTokenModels = {
  insertToken,
  getToken,
  deleteToken,
};
