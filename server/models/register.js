const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("dotnet_SumitM", "dotnet_SumitM", "LYqNqV4QKK8w", {
    host: "40.114.69.227",
    dialect: "mysql",
});

const Register = sequelize.define(
    "register",
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        Role_Id: Sequelize.INTEGER,
    },
    {
        tableName: "BlogUserregistration",
    }
);

module.exports = Register;