const { Router } = require("express");

//express validator
const {
  VerifyCreateGroupData,
  VerifyUpdateGroupData,
} = require("../middleware/verifyDataType.middleware.js");

//controllers
const {
  GetUserGroupByIdCtrl,
  CreateUserGroupCtrl,
  UpdateUserGroupCtrl,
} = require("../controller/group.controller.js");

//verify sesion import
const {
  VerifyHeaderToken,
} = require("../middleware/verifyToken.middleware.js");

//express router use
const route = Router();

//rest api routes
route.use(VerifyHeaderToken);

//router

//id routs
route
  .route("/:id")
  .get(GetUserGroupByIdCtrl)
  .patch(VerifyUpdateGroupData, UpdateUserGroupCtrl);

// simple routes
route.route("").post(VerifyCreateGroupData, CreateUserGroupCtrl);

module.exports = route;
