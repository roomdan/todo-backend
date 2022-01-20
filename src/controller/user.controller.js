const UserService = require("../service/user.service.js");
const ErrorHandler = require("../util/error_handler/error.handler.js");

//express validator
const { validationResult } = require("express-validator");

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

exports.UpdataUserCtrl = async (req, resp, next) => {
  try {
    const updateData = req.body;
    const { id } = req.params;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    const updatedService = await UserService.Update(updateData, id);
    if (updatedService.error) {
      return resp.status(400).json(updatedService);
    }

    resp.status(201).json({
      message: "User Update Succes",
      "data-updated": true,
    });
  } catch (error) {
    next(
      new ErrorHandler(
        error.message.toUpperCase() === "validation error".toUpperCase()
          ? "Verify data, username, cell phone number or email are already registered with an active user"
          : "Data error, fail server request",
        400
      )
    );
  }
};

exports.DeleteUserCtrl = async (req, resp, next) => {
  try {
    const { id } = req.params;
    const Delete = await UserService.DeleteUser(id);

    resp.status(201).json(Delete);
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

exports.AutUserCtrl = async (req, resp, next) => {
  try {
    const { userName, password } = req.body;
    const ValidateCredentials = await UserService.AuthSesion({
      userName,
      password,
    });

    const cookieConfig = {
      httpOnly: true,
      expires: new Date(
        Date.now() + process.env.JWT_EXPIRES_TOKEN * 60 * 60 * 1000
      ),
    };

    //send cookie with the token acces
    resp.cookie("login", ValidateCredentials.token, cookieConfig);

    // ValidateCredentials.token = undefined;
    resp.status(400).json(ValidateCredentials);
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

exports.GetUserCtrl = async (req, resp, next) => {
  try {
    const { user } = req.query;
    if (user) {
      const GetOnlyUser = await UserService.GetUserInfo(user);
      resp.status(200).json(GetOnlyUser);
    }

    const GetAllUsers = await UserService.GetUserInfo();
    resp.status(200).json(GetAllUsers);
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};
