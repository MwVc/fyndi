const express = require("express");
require("dotenv").config();
const cors = require("cors");
const authRouter = require("./routes/auth");
const servicesRouter = require("./routes/services");
const cookieParser = require("cookie-parser");

const app = express();

const PORT = process.env.PORT;

console.log(PORT);

// middleware
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// routes
app.get("/", (req, res) => {
  res.send("API is runnning");
});
app.use("/api/auth", authRouter);
app.use("/api/services", servicesRouter);

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
