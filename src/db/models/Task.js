const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Task', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false
    },
    userDataId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'UserData',
        key: 'id'
      }
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
    tableName: 'Task',
    schema: 'public',
    timestamps: true,
    indexes: [
      {
        name: "Task_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
