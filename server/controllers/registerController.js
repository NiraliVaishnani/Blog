const Register = require("../models/register");
const UserProfile = require("../models/UserProfile");
const Rolepermission = require("../server");

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

// Rolepermission.findAll()
//   .then((roles) => {
//     console.log("Rolepermission,,,,,,5434543543545454554554");
//   })
//   .catch((error) => {
//     console.error("Error fetching:", error);
//   });
