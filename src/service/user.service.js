const Models = require("../db/models/init-models.js");
const Bcript = require("bcryptjs");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");

dotenv.config();

const { UserData, Group } = Models();

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

    const validateUnicUser = await UserData.findOne({
      where: { email: user.email },
    });

    if (validateUnicUser) {
      return {
        status:
          "User email is already registered, please log in or register another user.",
        userStatus: "Fail register",
        data: "no data",
      };
    }

    const db_create = await UserData.create({
      ...user,
      password: encriptPassword,
    });

    db_create.password = undefined;
    db_create.userName = undefined;

    return {
      status: "Succes create user",
      userStatus: "register",
      data: db_create,
    };
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
        active: true,
      },
    });

    if (!validateData) {
      return {
        error: "Incorrect Credentials",
        acces: false,
        message: "acces denied",
      };
    }

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

  static async SetUserGroup(id, group) {
    const addGroup = await Group.findOne({ where: { id: group } });
    if (addGroup) {
      const updateUserGroup = await UserData.update(
        {
          Group_id: group,
        },
        {
          where: {
            id: parseInt(id, 10),
            active: true,
          },
        }
      );
      if (updateUserGroup[0] === 1) {
        return {
          groupData: addGroup,
          message: "Update Group Succes",
          status: 201,
        };
      } else {
        return {
          error: "Error, User is not exist or inactive",
          message: "Please verify user Data and try again.",
          status: 400,
        };
      }
    }

    return {
      error: "Error, Group not exist",
      message: "This group not exist, please create before this group.",
      status: 400,
    };
  }
}

module.exports = ManageUsers;
