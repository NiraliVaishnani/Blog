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

const Blog = sequelize.define(
  "blog",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: Sequelize.STRING,
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    description: Sequelize.STRING,
    image: Sequelize.STRING,
  },
  {
    tableName: "Blog",
    timestamps: false,
  }
);

module.exports = Blog;
