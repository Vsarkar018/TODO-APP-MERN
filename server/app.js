require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const authenticateUser = require('./middleware/auth')
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/error-handler");
const authRouter = require("./routes/auth");
app.use(express.json());
app.use(require("cors")());
app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandler);
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
