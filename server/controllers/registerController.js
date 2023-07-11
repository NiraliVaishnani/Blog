const Register = require("../models/register");

exports.getAllRegisteredUser = async (req, res) => {
    const sql = await Register.findAll();
    res.json(sql);
}

exports.createRegister = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const sql = await Register.create({ username, email, password });
        res.json(sql);
    } catch (err) {
        console.log(err);
    }
}