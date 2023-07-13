const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("dotnet_SumitM", "dotnet_SumitM", "LYqNqV4QKK8w", {
    host: "40.114.69.227",
    dialect: "mysql",
});
const Role = sequelize.define(
    "Country",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        rolename: Sequelize.STRING,

    },
    {
        tableName: "Userrole",
    }
);
module.exports = Role;