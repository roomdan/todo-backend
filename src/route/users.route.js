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
} = require("../controller/user.controller");

//token verify middleware
const { VerifyHeaderToken } = require("../middleware/verifyToken.middleware");

const router = Router();

router.post("", CreateUserCtrl);
router.post("/client-auth", AutUserCtrl);

router.use(VerifyHeaderToken);
router.get("", GetUserCtrl);
router
  .route("/:id")
  .patch(VerifyContentMiddleware, UpdataUserCtrl)
  .delete(DeleteUserCtrl);

module.exports = router;
