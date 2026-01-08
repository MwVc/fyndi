import app from "./app.js";
import { config } from "dotenv";

config(); // load enviroment variables

const PORT = process.env.PORT;

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
