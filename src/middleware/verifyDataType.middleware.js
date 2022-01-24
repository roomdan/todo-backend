const { body } = require("express-validator");

exports.VerifyContentMiddleware = [
  body("name")
    .isString()
    .withMessage("Error, name is not a string")
    .notEmpty()
    .withMessage("Error, name could not be empty"),
];

exports.VerifyCreateGroupData = [
  body("groupName")
    .isString()
    .withMessage("Error, groupName datatype string, verify your data.")
    .notEmpty()
    .withMessage("Group name is empty, please send string data"),
  body("description")
    .notEmpty()
    .withMessage("Description is empty, please send string data")
    .isString()
    .withMessage("Error, Description datatype string, verify your data."),
];

exports.VerifyUpdateGroupData = [
  body("groupName")
    .notEmpty()
    .withMessage("Error, group name field can be empty.")
    .isString()
    .withMessage(
      "Error, group name field datatype string, verify your data type and try again"
    ),
];
