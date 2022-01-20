const Models = require("../db/models/init-models.js");
const Bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const { UserData } = Models();

class ManageUsers {
  static async Create(user) {
    const saltBcript = await Bcript.genSalt(7);
    const encriptPassword = await Bcript.hash(user.password, saltBcript);

    user = {
      userName: user.userName,
      password: encriptPassword,
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email,
    };

    const db_create = await UserData.create({
      ...user,
      password: encriptPassword,
    });

    db_create.password = undefined;
    db_create.userName = undefined;

    return db_create;
  }

  static async Update(upData, id) {
    id = Number(id);
    const updataData = {
      userName: upData.userName,
      name: upData.name,
      latName: upData.lastName,
      phone: upData.phone,
      email: upData.email,
    };

    const userVerify = await UserData.findOne({ where: id });

    if (!userVerify || !userVerify.active) {
      return {
        error: "this user is not availble",
        status: 400,
      };
    }

    const db_user = await UserData.update(updataData, { where: { id } });
    return db_user;
  }

  static async DeleteUser(id) {
    id = parseInt(id, 10);
    const dataUser = await UserData.findOne({ where: id });
    if (!dataUser || !dataUser.active) {
      return {
        error: "User is not active or has been deleted old",
        status: 400,
      };
    }

    const deleteUser = await UserData.update(
      { active: false },
      { where: { id } }
    );
    return deleteUser[0] !== 1
      ? { error: "user not exist or has been deleted old", updated: false }
      : { error: false, updated: true };
  }

  static async AuthSesion(credentials) {
    const validateData = await UserData.findOne({
      where: {
        userName: credentials.userName,
      },
    });

    const ValidatePassword = await Bcript.compare(
      credentials.password,
      validateData.password
    );

    if (!ValidatePassword) {
      return {
        error: "Incorrect Credentials",
        acces: false,
        message: "acces denied",
      };
    }

    validateData.password = undefined;
    validateData.userName = undefined;
    validateData.Group_id = undefined;
    validateData.deleted = undefined;

    const token = jwt.sign(
      { id: validateData.id, email: validateData.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    return {
      token,
      user_data: validateData,
      acces: ValidatePassword,
      message: "Correct Credentials, succes acces.",
    };
  }

  static async GetUserInfo(id) {
    if (id) {
      const getUser = await UserData.findOne({
        where: {
          id: Number(id),
          active: true,
        },
        attributes: {
          exclude: ["password", "userName", "deleted", "active"],
        },
      });
      return getUser
        ? getUser
        : {
            error: "An error ocurred, user is not available or not exist",
            status: 400,
          };
    } else {
      const getUsers = await UserData.findAll({
        where: {
          active: true,
        },
        attributes: {
          exclude: ["password", "userName", "deleted", "active"],
        },
      });

      return getUsers;
    }
  }
}

module.exports = ManageUsers;
