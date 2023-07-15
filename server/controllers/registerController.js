const Register = require("../models/register");
// const UserProfile = require();
const BlogSetting = require("../models/setting");
const UserProfile = require("../models/UserProfile");
// const { UserProfile } = require("../server");

exports.getAllRegisteredUser = async (req, res) => {
  const sql = await Register.findAll();
  const registered = await UserProfile.findAll();
  res.json(registered);
};

//// Accessing Userprofile model
UserProfile.findAll()
  .then((roles) => {
    console.log("Roles:hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  })
  .catch((error) => {
    console.error("Error fetching :", error);
  });

BlogSetting.findAll()
  .then((roles) => {
    console.log("Roles:hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
  })
  .catch((error) => {
    console.error("Error fetching :", error);
  });

exports.createRegister = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const sql = await Register.create({ username, email, password });
    const userProfile = await UserProfile.create({ email, password });
    res.json(userProfile);
  } catch (err) {
    console.log(err);
  }
};

// // Accessing Role model
// UserProfile.findAll()
//     .then(roles => {
//         console.log('Userprofile........................................................');
//     })
//     .catch(error => {
//         console.error('Error fetching Roles:', error);
//     });
