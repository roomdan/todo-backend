const { Router } = require("express");
const {
  VerifyContentMiddleware,
} = require("../middleware/verifyDataType.middleware");
//controllers
const {
  CreateUserCtrl,
  UpdataUserCtrl,
  DeleteUserCtrl,
  AutUserCtrl,
  GetUserCtrl,
  SetUserGroupCtrl,
} = require("../controller/user.controller");

//token verify middleware
const { VerifyHeaderToken } = require("../middleware/verifyToken.middleware");

//Routes
const router = Router();

router.post("", CreateUserCtrl);
router.post("/client-auth", AutUserCtrl);

router.use(VerifyHeaderToken);
router.patch("/add-group", SetUserGroupCtrl);

//general routes
router
  .route("")
  .get(GetUserCtrl)
  .patch(VerifyContentMiddleware, UpdataUserCtrl)
  .delete(DeleteUserCtrl);

module.exports = router;
