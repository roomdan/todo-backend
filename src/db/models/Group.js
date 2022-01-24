const Sequelize = require("sequelize");
module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "Group",
    {
      id: {
        autoIncrement: true,
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
      groupName: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "new group",
      },
      profile_img: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
      },
      description: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: "Without description",
      },
    },
    {
      sequelize,
      tableName: "Group",
      schema: "public",
      timestamps: true,
      indexes: [
        {
          name: "Group_pkey",
          unique: true,
          fields: [{ name: "id" }],
        },
      ],
    }
  );
};
