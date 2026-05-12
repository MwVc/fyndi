import app from "./app.js";
import { config } from "dotenv";
import { readFileSync } from "fs";
import https from "https";
import "./infrastructure/config/env.js";

config(); // load enviroment variables

const PORT = process.env.PORT;
const isProd = process.env.NODE_ENV;

if (isProd === "prod") {
  app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
} else {
  // create a https server when in dev mode
  const options = {
    key: readFileSync("../certs/localhost+2-key.pem", "utf8"),
    cert: readFileSync("../certs/localhost+2.pem", "utf8"),
  };

  const httpsServer = https
    .createServer(options, app)
    .listen(PORT, () => console.log(`HTTPS server is listening on ${PORT}`));
}
