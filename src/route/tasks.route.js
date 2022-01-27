const { Router } = require("express");

// ? controllers

const {
  GetAllUserTasksCtrl,
  CreateUserTaskCtrl,
  UpdateUserTaskCtrl,
  DeleteUserTaskCtrl,
} = require("../controller/tasks.controller");
const { VerifyHeaderToken } = require("../middleware/verifyToken.middleware");

const route = Router();

// ? General middlewares
route.use(VerifyHeaderToken);

// * routes
route.route("").get(GetAllUserTasksCtrl).post(CreateUserTaskCtrl);

route.route("/:id").patch(UpdateUserTaskCtrl).delete(DeleteUserTaskCtrl);

// ? export route
module.exports = route;
