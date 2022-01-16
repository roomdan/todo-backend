const { Router } = require("express");
const {
  CreateUserCtrl,
  UpdataUserCtrl,
} = require("../controller/user.controller");

const router = Router();

router.post("", CreateUserCtrl);
router.patch("/:id", UpdataUserCtrl);

module.exports = router;
