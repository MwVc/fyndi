// import type { RegisterUserData } from "../services/users.services.js";
import pool from "../../infrastructure/db/pgPool.db.js";
import type { InsertUserData, DatabaseUser } from "./users.types.js";

const insert = async ({
  firstName,
  lastName,
  email,
  password,
}: InsertUserData) => {
  const { rows } = await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, email, password]
  );
  return rows[0];
};

const getByEmail = async (email: string): Promise<DatabaseUser> => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return rows[0];
};

export const userModels = {
  insert,
  getByEmail,
};
