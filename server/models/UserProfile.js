const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "dotnet_SumitM",
  "dotnet_SumitM",
  "LYqNqV4QKK8w",
  {
    host: "40.114.69.227",
    dialect: "mysql",
  }
);

const UserProfile = sequelize.define(
  "UserProfile",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstname: Sequelize.STRING,
    lastname: Sequelize.STRING,
    gender: Sequelize.STRING,
    email: Sequelize.STRING,
    password: Sequelize.STRING,
    resetToken: Sequelize.STRING,
    rolename: Sequelize.STRING,
    registerId: Sequelize.STRING,
  },
  {
    tableName: "UserProfile",
  }
);
module.exports = UserProfile;

