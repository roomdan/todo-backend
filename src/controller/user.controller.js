const UserService = require("../service/user.service.js");
const ErrorHandler = require("../util/error_handler/error.handler.js");
const jwt = require("jsonwebtoken");

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

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    const updatedService = await UserService.Update(
      updateData,
      req.userInSesion.id
    );
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
          ? "Verify data, username, cell phone number or email are already registered with an active user, select other value"
          : "Data error, fail server request",
        400
      )
    );
  }
};

exports.DeleteUserCtrl = async (req, resp, next) => {
  try {
    const Delete = await UserService.DeleteUser(req.userInSesion.id);

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
    const GetOnlyUser = await UserService.GetUserInfo(req.userInSesion.id);
    resp.status(200).json(GetOnlyUser);
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};

exports.SetUserGroupCtrl = async (req, resp, next) => {
  try {
    const { Group_id } = req.body;
    const userData = UserService.SetUserGroup(req.userInSesion.id, Group_id);
    resp.status(200).json(userData);
  } catch (error) {
    next(new ErrorHandler(error.message, 400));
  }
};
