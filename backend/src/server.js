import app from "./app";
import { config } from "process";

config(); // load enviroment variables

const PORT = process.env.PORT;

console.log(PORT);

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));
