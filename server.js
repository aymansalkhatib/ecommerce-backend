const express = require("express");
const dotenv = require("dotenv").config({ path: "config.env" });
const morgan = require("morgan");
const dbConnection = require("./config/database");
const categoryRoute = require("./routes/categoryRoute");
const ApiError = require("./utils/apiError");
const globalError = require("./middlewares/errorsMiddlewre");

//! Connection with database
dbConnection();

//! Express app
const app = express();

//! Middlewares
app.use(express.json());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  console.log(`mode: ${process.env.NODE_ENV}`);
}

//! Mount Routes
app.use("/api/v1/categories", categoryRoute);

app.all("*", (req, res, next) => {
  next(new ApiError(`Can't find this route: ${req.originalUrl}`, 400));
});

app.use(globalError);

const port = process.env.PORT || 8000;

const server = app.listen(port, () => {
  console.log(`start server with port: ${port}`);
});

process.on("uncaughtException", (err) => {
  console.error(`UncaughtException Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down....");
    process.exit(1);
  });
});

process.on("unhandledRejection", (err) => {
  console.error(`UncaughtException Error: ${err.name} | ${err.message}`);
  server.close(() => {
    console.error("Shutting down....");
    process.exit(1);
  });
});
