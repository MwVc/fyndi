import pkg from "pg";
import { logger } from "../logger/logger.js";
// import { config } from "dotenv";

// config(); // load environment variables

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

pool.on("connect", () => {
  logger.info("pgPool.ts: Connected to PosgreSQL DB\n");
});

export default pool;
