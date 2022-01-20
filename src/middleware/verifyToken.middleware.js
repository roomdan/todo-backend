const jwt = require("jsonwebtoken");
const ErrorApp = require("../util/error_handler/error.handler");
const dotenv = require("dotenv");

const Models = require("../db/models/init-models.js");

const { UserData } = Models();

dotenv.config();

exports.VerifyHeaderToken = async (req, resp, next) => {
  try {
    const { authorization } = req.headers;

    let token;

    if (!authorization && authorization.startsWith("Bearer")) {
      return next(
        new ErrorApp(
          "Error, invalid api acces, please verify de acces token.",
          400
        )
      );
    } else {
      const AuthToken = authorization.split(" ")[1];

      token = AuthToken;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const userInfo = await UserData.findByPk(decoded.id, {
      where: {
        active: true,
      },
      attributes: {
        exclude: ["password", "userName", "deleted", "active"],
      },
    });

    if (!userInfo) {
      return next(new ErrorApp("Invalid Token", 400));
    }

    req.userInSesion = userInfo;

    next();
  } catch (error) {
    next(new ErrorApp(error.message, 400));
  }
};
