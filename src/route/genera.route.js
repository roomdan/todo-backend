const { Router } = require("express");
const { GeneralController } = require("../controller/general.controller");

const _g_ = GeneralController;
const route = Router();

route.route("*").get(_g_).post(_g_).patch(_g_).delete(_g_).put(_g_);

module.exports = route;
