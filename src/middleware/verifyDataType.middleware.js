const { body } = require("express-validator");

exports.VerifyContentMiddleware = [
  body("password")
    .isString()
    .withMessage("Error, fail password is not string")
    .notEmpty()
    .withMessage("Error, Password could not be empty"),
  body("name"),
];
