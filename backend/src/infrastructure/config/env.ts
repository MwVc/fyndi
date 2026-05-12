import * as dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env.dev";

console.log(process.env);

dotenv.config({ path: envFile });

// console.log(`Loaded env: ${envFile}`);
