const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("dotnet_SumitM", "dotnet_SumitM", "LYqNqV4QKK8w", {
    host: "40.114.69.227",
    dialect: "mysql",
});

const BlogSetting = sequelize.define(
    "Setting",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        Key: Sequelize.STRING,
        Value: Sequelize.STRING,
    },
    {
        tableName: "BlogSetting",
    }
);
module.exports = BlogSetting;
