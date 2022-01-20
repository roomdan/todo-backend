const { body } = require("express-validator");

exports.VerifyContentMiddleware = [
  body("name")
    .isString()
    .withMessage("Error, name is not a string")
    .notEmpty()
    .withMessage("Error, name could not be empty"),
];
