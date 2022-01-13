//work-dev
const express = require("express");

//dependencies
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const path = require("path");

// ENV
const dev_ENV = path.resolve(__dirname, "../", "config.env");
dotenv.config({ path: dev_ENV });

//project sources
const UsersRouter = require("./route/users.route.js");
const { ErrorHandler } = require("./middleware/errorHandler.middleware.js");

const app = express();

// project middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// project routes
app.use("/v1/users", UsersRouter);
// Errors Routes Middleware
app.use(ErrorHandler);

module.exports = app;
