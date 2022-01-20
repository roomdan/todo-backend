const jwt = require("jsonwebtoken");
const ErrorApp = require("../util/error_handler/error.handler");
const dotenv = require("dotenv");

const Models = require("../db/models/init-models.js");

const { UserData } = Models();

dotenv.config();

exports.VerifyHeaderToken = async (req, resp, next) => {
  const { authorization } = req.headers;
  if (!authorization && authorization.startsWith("Bearer")) {
    return next(
      new ErrorApp(
        "Error, invalid api acces, please verify de acces token.",
        400
      )
    );
  } else {
    const AuthToken = authorization.split(" ")[1];

    const decoded = jwt.verify(AuthToken, process.env.JWT_SECRET);
    if (!decoded) {
      next(new ErrorApp("Acces token is not active"));
    }

    const userInfo = await UserData.findByPk(decoded.id, {
      attributes: {
        exclude: ["password", "userName", "deleted", "active"],
      },
    });

    req.userInSesion = userInfo;
    next();
  }
};
