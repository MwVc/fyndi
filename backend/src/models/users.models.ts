// import type { RegisterUserData } from "../services/users.services.js";
import pool from "../db/pgPool.db.js";

const insert = async ({
  firstName,
  lastName,
  email,
  password,
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) => {
  const { rows } = await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, email, password],
  );
  return rows[0];
};

const getByEmail = async (email: string) => {
  const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  return rows[0];
};

export const userModels = {
  insert,
  getByEmail,
};
