const Models = require("../db/models/init-models.js");
const Bcript = require("bcryptjs");

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

  static async Update(upData, id) {}
}

module.exports = ManageUsers;
