import type { RegisterUserData } from "../services/users.services.js";
import pool from "../db/pgPool.db.js";

const insert = async ({
  firstName,
  lastName,
  email,
  hashedPassword,
}: RegisterUserData) => {
  const { rows } = await pool.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
    [firstName, lastName, email, hashedPassword],
  );
  return rows[0];
};

export const models = {
  insert,
};
