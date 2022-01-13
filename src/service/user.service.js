const Models = require("../db/models/init-models.js");
const Bcript = require("bcryptjs");

const { UserData } = Models();

class ManageUsers {
  static async Create(user) {
    const saltBcript = await Bcript.genSalt(7);
    const encriptPassword = await Bcript.hash(user.password, saltBcript);

    const db_create = await UserData.create({
      ...user,
      password: encriptPassword,
    });
    return db_create;
  }
}

module.exports = ManageUsers;
