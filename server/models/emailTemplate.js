const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize("dotnet_SumitM", "dotnet_SumitM", "LYqNqV4QKK8w", {
    host: "40.114.69.227",
    dialect: "mysql",
});

const EmailTemplate = sequelize.define(
    "EmailTemplate",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        subject: DataTypes.STRING,
        body: DataTypes.STRING,
    },
    {
        tableName: "BlogEmailTemplate",
    }
);

module.exports = EmailTemplate;
