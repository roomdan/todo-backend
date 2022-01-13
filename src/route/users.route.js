const { Router } = require("express");
const { CreateUserCtrl } = require("../controller/user.controller");

const router = Router();

router.post("", CreateUserCtrl);

module.exports = router;
