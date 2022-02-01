const dotenv = require("dotenv");
const path = require("path");

const env = path.join(__dirname, "..", "..", "..", "..", "config.env");

dotenv.config({ path: env });

const config = {
  development: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    username: process.MAIL_USER,
    password: process.MAIL_PASS,
  },
  test: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    username: process.MAIL_USER,
    password: process.MAIL_PASS,
  },
  production: {
    service: process.env.MAIL_PROD_SERVICE,
    auth: {
      user: process.env.MAIL_PROD_USER,
      pass: process.env.MAIL_PROD_PASS,
    },
  },
};

module.exports = config;
