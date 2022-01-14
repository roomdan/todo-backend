const UserService = require("../service/user.service.js");
const ErrorHandler = require("../util/error_handler/error.handler.js");

exports.CreateUserCtrl = async (req, resp, next) => {
  try {
    const userData = req.body;
    const Create_db = await UserService.Create(userData);
    resp.status(201).json(Create_db);
  } catch (error) {
    next(
      new ErrorHandler(
        "User Data Error, please verify data types or view our documentation",
        400
      ).Error()
    );
  }
};
