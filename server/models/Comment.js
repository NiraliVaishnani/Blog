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

const Comment = sequelize.define(
  "Comment",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    text: Sequelize.STRING,
    user_id: Sequelize.STRING,
    user_name: Sequelize.STRING,
    parent_id: Sequelize.INTEGER,
  },
  {
    tableName: "Comment",
  }
);
Comment.sync();
module.exports = Comment;
