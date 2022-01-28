var _sequelize = require("sequelize");
var _Group = require("./Group");
var _Task = require("./Task");
var _UserData = require("./UserData");

// config sequelize obj

const config = require("../config/config.js");

function initModels() {
  const { DataTypes } = _sequelize;
  let sequelize;

  // define db method
  const env = process.env.NODE_ENV || "development";
  const configObj = config[env];

  if (config.use_env_variable) {
    sequelize = new _sequelize(config.use_env_variable, config);
  } else {
    sequelize = new _sequelize(
      configObj.database,
      configObj.username,
      configObj.password,
      configObj
    );
  }

  var Group = _Group(sequelize, DataTypes);
  var Task = _Task(sequelize, DataTypes);
  var UserData = _UserData(sequelize, DataTypes);

  Task.belongsTo(Group, { as: "Group", foreignKey: "Group_id" });
  Group.hasMany(Task, { as: "Tasks", foreignKey: "Group_id" });
  UserData.belongsTo(Group, { as: "Group", foreignKey: "Group_id" });
  Group.hasMany(UserData, { as: "UserData", foreignKey: "Group_id" });
  Task.belongsTo(UserData, { as: "userDatum", foreignKey: "userDataId" });
  UserData.hasMany(Task, { as: "Tasks", foreignKey: "userDataId" });

  return {
    Group,
    Task,
    UserData,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
