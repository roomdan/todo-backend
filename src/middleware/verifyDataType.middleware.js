const { body } = require("express-validator");

exports.VerifyContentMiddleware = [
  body("name")
    .isString()
    .withMessage("Error, name is not a string")
    .notEmpty()
    .withMessage("Error, name could not be empty"),
];

exports.VerifyCreateUserDataMiddleware = [
  body("userName")
    .notEmpty()
    .withMessage("User Name cant be empty")
    .isString()
    .withMessage("UserName is not an estring"),
  body("email")
    .notEmpty()
    .withMessage("Email cant be empty")
    .isString()
    .withMessage("Email is not an valid string")
    .isEmail()
    .withMessage("The file email is not a valid email."),
  body("password")
    .notEmpty()
    .withMessage("Password cant be empty.")
    .isAlphanumeric()
    .withMessage(
      "Password is not an alphanumeric sting, please validate data and try again. "
    ),
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
