const GroupService = require("../service/group.service.js");
const ErrorApp = require("../util/error_handler/error.handler.js");
const { validationResult } = require("express-validator");

exports.GetUserGroupByIdCtrl = async (req, resp, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return next(new ErrorApp("Please send group id.", 400));
    }

    const UserGroup = await GroupService.GetUserGroup(id);
    resp.status(200).json(UserGroup);
  } catch (error) {
    next(new ErrorApp(error.message, 400));
  }
};

exports.CreateUserGroupCtrl = async (req, resp, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    const data = req.body;

    const id = req.userInSesion.id;

    const createGroup = await GroupService.CreateGroup(data, id);

    if (createGroup[0] !== 1) {
      return next(
        new ErrorApp(
          "An error ocurred in this request, verify data type and names fileds and try again.",
          400
        )
      );
    }

    resp.status(201).json({
      created: true,
      message: "Succes Created data.",
      status: 201,
    });
  } catch (error) {
    next(new ErrorApp(error.message, 400));
  }
};

exports.UpdateUserGroupCtrl = async (req, resp, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return resp.status(400).json({ errors: errors.array() });
    }

    //logic and response
    const userId = req.userInSesion.id;
    const { id } = req.params;
    const data = req.body;

    const updateGroup = await GroupService.UpdateGroup(data, id, userId);
    resp.status(200).json(updateGroup);
  } catch (error) {
    next(new ErrorApp(error.message, 400));
  }
};
