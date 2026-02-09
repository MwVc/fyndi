import type { User } from "../models/user.js";
import pool from "../db/index.js";

export const createuser = async ({
  firstName,
  lastName,
  email,
  hashedPassword,
}: {
  firstName: string;
  lastName: string;
  email: string;
  hashedPassword: string;
}) => {
  try {
    const dbResponse = await pool.query(
      "INSERT INTO users (full_name, email, password) VALUES ($1, $2, $3, $4) RETURNING *",
      [firstName, lastName, email, hashedPassword],
    );
  } catch (error) {
    console.log(error);
  }
};
