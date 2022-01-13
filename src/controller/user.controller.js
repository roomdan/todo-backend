const UserService = require("../service/user.service.js");

exports.CreateUserCtrl = async (req, resp, next) => {
  try {
    const userData = req.body;
    const Create_db = await UserService.Create(userData);
    resp.status(201).json(Create_db);
  } catch (error) {
    next(error);
  }
};
