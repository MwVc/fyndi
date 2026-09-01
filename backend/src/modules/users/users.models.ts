// import type { RegisterUserData } from "../services/users.services.js";
import type { Pool, PoolClient } from "pg";
import pool from "../../infrastructure/db/pgPool.db.js";
import type {
  DatabaseUser,
  InsertUserData,
  PublicUser,
} from "./users.types.js";

const insert = async (
  { firstName, lastName, email, password, avatar }: InsertUserData,
  client: Pool | PoolClient = pool
): Promise<DatabaseUser> => {
  const { rows } = await client.query(
    "INSERT INTO users (first_name, last_name, email, password, avatar_url) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [firstName, lastName, email, password, avatar]
  );
  return rows[0];
};

const insertOauthAccount = async (
  {
    user_id,
    provider,
    provider_user_id,
  }: {
    user_id: string;
    provider: string;
    provider_user_id: string;
  },
  client: PoolClient
) => {
  const { rows } = await client.query(
    "INSERT INTO oauth_accounts (user_id, provider, provider_user_id) VALUES ($1, $2, $3) RETURNING *",
    [user_id, provider, provider_user_id]
  );

  return rows[0];
};

const getByEmail = async (email: string): Promise<DatabaseUser> => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return rows[0];
};

const getById = async (id: number): Promise<DatabaseUser> => {
  const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
  return rows[0];
};

export const userModels = {
  insert,
  getByEmail,
  getById,
  insertOauthAccount,
};
