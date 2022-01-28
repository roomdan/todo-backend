//work-dev
const express = require("express");

//librery protect xss xros script
const xss = require("xss-clean");

//protected api, proteje api contra ataques de peticiones excesivas desde una ip
const ratelimit = require("express-rate-limit");

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
const GroupsRouter = require("./route/group.route.js");
const TasksRouter = require("./route/tasks.route.js");

//erros middleware
const { ErrorHandler } = require("./middleware/errorHandler.middleware.js");

//cookier parser library
const cookieParser = require("cookie-parser");

const app = express();

//xss Cross-site scripting inplement

app.use(xss());

//expres rate limit-
app.use(
  ratelimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 10 * 1000, // Limit each IP to 5 create account requests per `window` (here, per hour)
    message:
      "Too many accounts created from this IP, please try again after an hour",
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

//cookies parser for
app.use(cookieParser());

// project middlewares
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(ErrorHandler);
// project routes
app.use("/api/v1/users", UsersRouter);
app.use("/api/v1/groups", GroupsRouter);
app.use("/api/v1/tasks", TasksRouter);
module.exports = app;
