const Register = require("../models/register");
const UserProfile = require("../models/UserProfile");
const UserPermissionModule = require("../server");


exports.getAllRegisteredUser = async (req, res) => {
  const sql = await Register.findAll();
  const registered = await UserProfile.findAll();
  
  res.json(sql);
};

exports.createRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const register = await Register.create({ username, email, password });
    const userProfile = await UserProfile.create({
      email,
      password,
      registerId: register.id,
    });
    console.log("Register ID:", register.id); // Corrected console log statement
    res.json(register);
  } catch (err) {
    console.log(err);
  }
};

// UserPermissionModule.Country.findAll()
//   .then((res) => {
//     console.log('asdfasdfasdfasfdadfa');
//   }).catch((error) => {
//     console.log(error);
//   })
