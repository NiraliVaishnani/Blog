const express = require("express");
const app = express();
app.use(express.json());
const mysql = require("mysql");
const { Sequelize } = require("sequelize");
const cors = require("cors");
app.use(cors());
const crypto = require("crypto");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
app.use(morgan("dev"));
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const multer = require("multer");
app.use(express.static("public"));
const nodemailer = require("nodemailer");
const Role = require("./models/roles");
const Register = require("./models/register");
const Country = require("./models/Country");
const City = require("./models/City");
const State = require("./models/State");
const Blog = require("./models/Blog");
const UserProfile = require("./models/UserProfile");
const emailTemplateRoutes = require("./routes/emailTemplateRoutes");
const settingRoutes = require("./routes/settingRoutes.js");
const roleRoutes = require("./routes/rolesRoutes.js");

const registerRoutes = require("./routes/registerRoutes.js");
const countryRoutes = require("./routes/countryRoutes");
const stateRoutes = require("./routes/stateRoutes");
const cityRoutes = require("./routes/cityRoutes");
const blogRoutes = require("./routes/blogRoutes");

const connection = mysql.createConnection({
  host: "40.114.69.227",
  user: "dotnet_SumitM",
  password: "LYqNqV4QKK8w",
  database: "dotnet_SumitM",
});
connection.connect(function (err) {
  if (err) throw err;
  console.log("Connection Successfull.......");
});

const sequelize = new Sequelize(
  "dotnet_SumitM",
  "dotnet_SumitM",
  "LYqNqV4QKK8w",
  {
    host: "40.114.69.227",
    dialect: "mysql",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

app.use("/api", emailTemplateRoutes);
app.use("/api", settingRoutes);
app.use("/api", roleRoutes);
app.use("/api/account", registerRoutes);
app.use("/api/country", countryRoutes);
app.use("/api/state", stateRoutes);
app.use("/api/city", cityRoutes);
app.use("/api/blog", blogRoutes);

Blog.sequelize.sync().then(() => {
  console.log("yes re sync");
});

// const path = require("path");
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/upload/");
//   },
//   filename: function (req, file, cb) {
//     cb(
//       null,
//       `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
//     );
//   },
// });

// const upload = multer({ storage: storage });

// const { Op } = require("sequelize");

app.post("/api/account/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Register.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      if (user.password === password) {
        const token = jwt.sign({ email }, "nirali");
        res.cookie("token", token);
        console.log(token);
        res.status(200).json({
          message: "Login successful",
          token,
          username: user.username,
        }); // Include the token field in the response
      } else {
        res.json({ message: "Invalid password" });
      }
    } else {
      res.json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});
function verifyToken(req, res, next) {
  const bearerHeader = req.headers["authorization"];
  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const token = bearer[1];
    req.token = token;
    next();
  } else {
    res.send({ result: "Token is not valid" });
  }
}
app.get("/api/account/get-username", verifyToken, async (req, res) => {
  try {
    const { email } = jwt.verify(req.token, "nirali");
    const user = await Register.findOne({
      where: {
        email: email,
      },
    });
    if (user) {
      res.status(200).json({ username: user.username });
    } else {
      res.json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

app.get("/logout", (req, res) => {
  res.clearCookie("Token");
  res.send("successfully logged out");
});

app.post("/api/account/profile", verifyToken, (req, res) => {
  jwt.verify(req.token, "nirali", (err, authData) => {
    if (err) {
      resp.send({ result: "invalid token" });
    } else {
      res.json({
        message: "profile accessed",
        authData,
      });
    }
  });
});

const Rolepermission = sequelize.define(
  "UserPermission",
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    PermissionName: Sequelize.STRING,
    RoleId: Sequelize.INTEGER,
  },
  {
    tableName: "UserPermission",
  }
);

app.post("/api/userpermission", async (req, res) => {
  const { permissions, RoleId } = req.body;

  try {
    // Create new permissions for the role
    for (const permission of permissions) {
      await Rolepermission.create({
        PermissionName: permission,
        RoleId: RoleId,
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error("Error creating user permissions:", error);
    res.status(500).send("Error creating user permissions.");
  }
});

app.post("/api/userpermission/:roleId", async (req, res) => {
  const { roleId } = req.params;
  const { permissions } = req.body;
  try {
    try {
      // Delete existing permissions for the role
      const deleted = await Rolepermission.destroy({
        where: { RoleId: roleId },
      });
      console.log("Delete", deleted);
    } catch (e) {
      console.log("Error deleting permissions");
    }

    // Create new permissions for the role
    for (const permission of permissions) {
      await Rolepermission.create({
        PermissionName: permission,
        RoleId: roleId,
      });
    }

    res.sendStatus(200);
  } catch (error) {
    console.error("Error updating user permissions:", error);
    res.status(500).send("Error updating user permissions.");
  }
});

// GET UserPermission by RoleId
app.get("/api/userpermission/:roleId", async (req, res) => {
  const { roleId } = req.params;
  try {
    const userPermissions = await Rolepermission.findAll({
      where: { RoleId: roleId },
    });
    res.json(userPermissions);
  } catch (error) {
    console.error("Error retrieving UserPermissions:", error);
    res.status(500).send("Error retrieving UserPermissions.");
  }
});

// Accessing Role model

UserProfile.belongsTo(Role, { foreignKey: "rolename" });
Register.hasOne(UserProfile, { foreignKey: "registerId" });
UserProfile.belongsTo(Register, { foreignKey: "registerId" });
// Add this code after defining the associations
sequelize
  .sync()
  .then(() => {
    console.log("Models synchronized successfully.");
  })
  .catch((err) => {
    console.error("Error synchronizing models:", err);
  });

Country.hasMany(State, { foreignKey: "countryId" });
State.belongsTo(Country, { foreignKey: "countryId" });

State.hasMany(City, { foreignKey: "stateId" });
City.belongsTo(State, { foreignKey: "stateId" });

Country.sequelize.sync().then(() => {
  console.log("yes re sync");
});

app.get("/api/userprofile", async (req, res) => {
  try {
    const profiles = await UserProfile.findAll();
    res.json(profiles);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// app.get("/api/userprofile/:id", async (req, res) => {
//   const profiles = await UserProfile.findAll({
//     where: { id: req.params.id },
//   });
//   res.json(profiles[0]);
// });

app.get("/api/userprofile/:id", async (req, res) => {
  const profile = await UserProfile.findByPk(req.params.id);
  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ error: "Profile not found" });
  }
});

app.post("/api/userprofile", async (req, res) => {
  const { firstname, lastname, gender, email, password, rolename, registerId } =
    req.body; // Include registerId
  try {
    const newProfile = await UserProfile.create({
      firstname,
      lastname,
      gender,
      email,
      password,
      rolename,
      registerId, // Assign registerId value
    });
    res.status(201).json(newProfile);
  } catch (error) {
    console.error("Error creating profile:", error);
  }
});

app.post("/api/userprofile/:id", async (req, res) => {
  const { id } = req.params;
  const {
    firstname,
    lastname,
    gender,
    email,
    password,
    name,
    rolename,
    registerId,
  } = req.body; // Include registerId
  try {
    const updateValues = {
      firstname,
      lastname,
      gender,
      email,
      name,
      rolename,
      registerId,
    }; // Assign registerId value
    if (password) {
      updateValues.password = password;
    }
    await UserProfile.update(updateValues, { where: { id } });
    const updatedProfile = await UserProfile.findByPk(id);
    res.json(updatedProfile);
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).send("Error updating profile.");
  }
});

// Delete a profile
app.delete("/api/userprofile/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await UserProfile.destroy({ where: { id } });
    res.json("Country deleted successfully.");
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).send("Error deleting country.");
  }
});

app.post("/api/reset-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Generate a reset token
    const resetToken = crypto.randomBytes(20).toString("hex");
    // Update the user's profile with the reset token
    await UserProfile.update({ resetToken }, { where: { email } });
    // const updatedProfile = await UserProfile.findByPk(id);
    const updatedProfile = await UserProfile.findOne({ where: { email } });

    // Call the sendResetPasswordEmail function with the reset token
    await sendResetPasswordEmail(email, resetToken);

    res.json({ message: "Reset password email sent" });
  } catch (error) {
    console.error("Error sending reset password email:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

async function sendResetPasswordEmail(email, resetToken) {
  try {
    // Create a Nodemailer transporter using SMTP or other transport options
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "nirali.evince@gmail.com",
        pass: "qaspbrvjqdsowvwz",
      },
    });

    const resetPasswordLink = `http://localhost:3000/userprofile/reset-password/${resetToken}`; // Replace with your password reset page URL
    const linkName = "Reset Password"; // The custom link name you want to display

    // Compose the email message
    const mailOptions = {
      from: "nirali.evince@gmail.com",
      to: email,
      subject: "Reset Your Password",
      html: `<p>Click the link below to ${linkName}:</p>
         <a href="${resetPasswordLink}">${linkName}</a>`,
    };

    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
  } catch (error) {
    console.error("Error sending reset password email:", error);
  }
}

app.post("/userprofile/reset-password/:resetToken", async (req, res) => {
  const resetToken = req.params.resetToken;
  const newPassword = req.body.password;

  try {
    // Validate the reset token and check if it's still valid
    const user = await UserProfile.findOne({
      where: {
        resetToken,
      },
    });
    if (!user) {
      return res.status(400).json({ error: "Invalid or expired reset token" });
    }

    // Update the user's password and clear the reset token
    user.password = newPassword;
    user.resetToken = null;
    await user.save();

    await Register.update(
      { password: newPassword },
      { where: { id: user.registerId } }
    );

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting password" });
  }
});

app.listen(5000);
