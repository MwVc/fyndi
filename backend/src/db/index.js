import pkg from "pg";
import { config } from "dotenv";

config(); // load environment variables

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  console.log("Connected to Posgresql");
});

export default pool;
