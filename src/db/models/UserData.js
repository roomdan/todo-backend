const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserData', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "UserData_userName_key"
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: "UserData_phone_key"
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: "UserData_email_key"
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true
    },
    Group_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Group',
        key: 'id'
      }
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  }, {
    sequelize,
    tableName: 'UserData',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "UserData_email_key",
        unique: true,
        fields: [
          { name: "email" },
        ]
      },
      {
        name: "UserData_phone_key",
        unique: true,
        fields: [
          { name: "phone" },
        ]
      },
      {
        name: "UserData_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "UserData_userName_key",
        unique: true,
        fields: [
          { name: "userName" },
        ]
      },
    ]
  });
};
