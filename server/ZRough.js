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
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const multer = require("multer");
app.use(express.static("public"));
const nodemailer = require("nodemailer");
const Role = require("./models/roles");
const Register = require("./models/register");
const Country = require("./models/Country");
const UserProfile = require("./models/UserProfile");
const City = require("./models/City");
const State = require("./models/State");
const emailTemplateRoutes = require("./routes/emailTemplateRoutes");
const settingRoutes = require("./routes/settingRoutes.js");
const roleRoutes = require("./routes/rolesRoutes.js");
const registerRoutes = require("./routes/registerRoutes.js");
const countryRoutes = require("./routes/countryRoutes");
const stateRoutes = require("./routes/stateRoutes");
const cityRoutes = require("./routes/cityRoutes");
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

Blog.sequelize.sync().then(() => {
  console.log("yes re sync");
});

const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/upload/");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

const { Op } = require("sequelize");

app.get("/api/blog", async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
  const perPage = 3; // Number of blogs per page
  const offset = (page - 1) * perPage; // Calculate the offset
  const searchTerm = req.query.search || "";
  try {
    const searchCondition = {
      [Op.or]: [
        { title: { [Op.like]: `%${searchTerm}%` } },
        { description: { [Op.like]: `%${searchTerm}%` } },
      ],
    };
    // Retrieve blogs from the database with pagination
    const blogs = await Blog.findAll({
      attributes: [
        "id",
        "title",
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y"),
          "createdAt",
        ],
        "description",
        "image",
      ],
      where: searchCondition,
      limit: perPage,
      offset: offset,
    });

    // Count the total number of blogs
    const totalCount = await Blog.count({ where: searchCondition });

    res.json({
      blogs,
      totalPages: Math.ceil(totalCount / perPage),
      currentPage: page,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/blog/search", async (req, res) => {
  const { title } = req.query; // Get the title query parameter

  try {
    // Perform search by title
    const blogs = await Blog.findAll({
      attributes: [
        "id",
        "title",
        [
          sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y"),
          "createdAt",
        ],
        "description",
        "image",
      ],
      where: {
        title: {
          [Sequelize.Op.like]: `%${title}%`,
        },
      },
    });

    res.json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/api/blog", upload.single("image"), async (req, res) => {
  const { title, description } = req.body;
  const image = req.file; // Access the uploaded image file
  try {
    const sql = await Blog.create({
      title,
      description,
      image: image.filename,
    });
    res.json(sql);
    console.log(req.image);
  } catch (err) {
    console.log(err);
  }
});

app.get("/api/blog/:id", async (req, res) => {
  const sql = await Blog.findByPk(req.params.id);
  res.json(sql);
});

app.post("/api/blog/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;
    const { title, description } = req.body;
    const image = req.file; // Access the uploaded image file
    await Blog.update(
      { title, description, image: image.filename },
      { where: { id: id } }
    );
    const updatedTask = await Blog.findByPk(id); // Retrieve the updated task from the database
    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/blog/:id", async (req, res) => {
  const id = req.params.id;
  try {
    await Blog.destroy({ where: { id: id } });
    res.json("Deleted successfully");
  } catch {
    res.json("Error");
  }
});

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
        res.status(200).json({ message: "Login successful", token }); // Include the token field in the response
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

// const Country = sequelize.define(
//   "Country",
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: Sequelize.STRING,
//   },
//   {
//     tableName: "UserCountry",
//   }
// );

// const State = sequelize.define(
//   "State",
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: Sequelize.STRING,
//   },
//   {
//     tableName: "UserState",
//   }
// );

// const City = sequelize.define(
//   "City",
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: Sequelize.STRING,
//   },
//   {
//     tableName: "UserCity",
//   }
// );

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
Role.findAll()
  .then((roles) => {
    // console.log('Roles:', roles);
  })
  .catch((error) => {
    console.error("Error fetching Roles:", error);
  });

// Accessing Register model
Register.findAll()
  .then((roles) => {
    // console.log('Roles:', roles);
  })
  .catch((error) => {
    console.error("Error fetching Roles:", error);
  });

// const UserProfile = sequelize.define(
//   "UserProfile",
//   {
//     id: {
//       type: Sequelize.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     firstname: Sequelize.STRING,
//     lastname: Sequelize.STRING,
//     gender: Sequelize.STRING,
//     email: Sequelize.STRING,
//     password: Sequelize.STRING,
//     resetToken: Sequelize.STRING,
//     rolename: Sequelize.STRING,
//     registerId: Sequelize.STRING,
//   },
//   {
//     tableName: "UserProfile",
//   }
// );
// module.exports = { UserProfile };

UserProfile.belongsTo(Role, { foreignKey: "rolename" });
Register.hasOne(UserProfile, { foriegnKey: "email" });
UserProfile.belongsTo(Role, { foreignKey: "email" });

Country.hasMany(State, { foreignKey: "countryId" });
State.belongsTo(Country, { foreignKey: "countryId" });

State.hasMany(City, { foreignKey: "stateId" });
City.belongsTo(State, { foreignKey: "stateId" });

Country.sequelize.sync().then(() => {
  console.log("yes re sync");
});

app.get("/api/address/countries", async (req, res) => {
  const countries = await Country.findAll();
  res.json(countries);
});

app.get("/api/address/state/:countryId", async (req, res) => {
  const states = await State.findAll({
    where: { countryId: req.params.countryId },
  });
  res.json(states);
});

app.get("/api/address/city/:stateId", async (req, res) => {
  const cities = await City.findAll({
    where: { stateId: req.params.stateId },
  });
  res.json(cities);
});

// API endpoint to handle form submission
app.post("/api/address/submit", async (req, res) => {
  const { country, state, city } = req.body;
  try {
    // Create a new address record in the database
    const address = await Address.create({ country, state, city });
    res.json({ message: "Address stored successfully", address });
  } catch (error) {
    console.error("Error submitting address:", error);
    res.status(500).json({ error: "Failed to submit address" });
  }
});

app.get("/api/address/submit", async (req, res) => {
  const address = await Address.findAll();
  res.json(address);
});

// Get all countries
app.get("/api/country", async (req, res) => {
  try {
    const countries = await Country.findAll();
    res.json(countries);
  } catch (error) {
    console.error("Error retrieving countries:", error);
    res.status(500).send("Error retrieving countries.");
  }
});

// Get a specific country by ID
app.get("/api/country/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const country = await Country.findByPk(id);
    if (!country) {
      res.json("Country not found");
    } else {
      res.json(country);
    }
  } catch (error) {
    console.error("Error retrieving country:", error);
    res.status(500).send("Error retrieving country.");
  }
});

// Create a new country
app.post("/api/country", async (req, res) => {
  const { name } = req.body;
  try {
    const newCountry = await Country.create({ name });
    res.json(newCountry);
  } catch (error) {
    console.error("Error creating country:", error);
    res.status(500).send("Error creating country.");
  }
});

// Update a country
app.post("/api/country/:id", async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    await Country.update({ name }, { where: { id } });
    const updatedCountry = await Country.findByPk(id);
    res.json(updatedCountry);
  } catch (error) {
    console.error("Error updating country:", error);
    res.status(500).send("Error updating country.");
  }
});

// Delete a country
app.delete("/api/country/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Country.destroy({ where: { id } });
    res.json("Country deleted successfully.");
  } catch (error) {
    console.error("Error deleting country:", error);
    res.status(500).send("Error deleting country.");
  }
});

app.get("/api/state", async (req, res) => {
  const states = await State.findAll();
  res.json(states);
});

app.get("/api/state/:id", async (req, res) => {
  const state = await State.findByPk(req.params.id);
  if (!state) {
    res.status(404).json({ error: "State not found" });
  } else {
    res.json(state);
  }
});

app.post("/api/state", async (req, res) => {
  const { name, countryId } = req.body; // Add countryId to the destructured object
  try {
    const newState = await State.create({ name, countryId }); // Include countryId in the create method
    res.status(201).json(newState);
  } catch (error) {
    console.error("Error creating state:", error);
    res.status(500).send("Error creating state.");
  }
});

app.post("/api/state/:id", async (req, res) => {
  const { name, countryId } = req.body;
  const id = req.params.id;
  try {
    const state = await State.findByPk(id);
    if (!state) {
      res.status(404).json({ error: "State not found" });
    } else {
      await state.update({ name, countryId });
      res.json(state);
    }
  } catch (error) {
    console.error("Error updating state:", error);
    res.status(500).send("Error updating state.");
  }
});

app.delete("/api/state/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const state = await State.findByPk(id);
    if (!state) {
      res.status(404).json({ error: "State not found" });
    } else {
      await state.destroy();
      res.json("State deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting state:", error);
    res.status(500).send("Error deleting state.");
  }
});

app.get("/api/city", async (req, res) => {
  const cities = await City.findAll();
  res.json(cities);
});

app.get("/api/city/:id", async (req, res) => {
  const city = await City.findByPk(req.params.id);
  if (!city) {
    res.status(404).json({ error: "City not found" });
  } else {
    res.json(city);
  }
});

app.post("/api/city", async (req, res) => {
  const { name, stateId } = req.body;
  try {
    const newCity = await City.create({ name, stateId });
    res.status(201).json(newCity);
  } catch (error) {
    console.error("Error creating city:", error);
    res.status(500).send("Error creating city.");
  }
});

app.post("/api/city/:id", async (req, res) => {
  const { name, stateId } = req.body;
  const id = req.params.id;
  try {
    const city = await City.findByPk(id);
    if (!city) {
      res.status(404).json({ error: "City not found" });
    } else {
      await city.update({ name, stateId });
      res.json(city);
    }
  } catch (error) {
    console.error("Error updating city:", error);
    res.status(500).send("Error updating city.");
  }
});

app.delete("/api/city/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const city = await City.findByPk(id);
    if (!city) {
      res.status(404).json({ error: "City not found" });
    } else {
      await city.destroy();
      res.json("City deleted successfully");
    }
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).send("Error deleting city.");
  }
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

// app.get("/api/userprofile/:id", async (req, res) => {
//   const profiles = await UserProfile.findAll({
//     where: { id: req.params.id },
//   });
//   res.json(profiles); // Send the entire profiles array as the API response
// });
app.get("/api/userprofile/:id", async (req, res) => {
  const profile = await UserProfile.findByPk(req.params.id);
  if (profile) {
    res.json(profile);
  } else {
    res.status(404).json({ error: "Profile not found" });
  }
});

// app.post("/api/userprofile", async (req, res) => {
//   const { firstname, lastname, gender, email, password, rolename } = req.body;
//   try {
//     const newProfile = await UserProfile.create({
//       firstname,
//       lastname,
//       gender,
//       email,
//       password,
//       rolename
//     });
//     res.status(201).json(newProfile);
//   } catch (error) {
//     console.error("Error creating profile:", error);
//   }
// });

// app.post("/api/userprofile", async (req, res) => {
//   const { firstname, lastname, gender, email, password, rolename } = req.body;
//   try {
//     const newProfile = await UserProfile.create({
//       firstname,
//       lastname,
//       gender,
//       email,
//       password,
//       rolename, registerId,
//     });
//     res.status(201).json(newProfile);
//   } catch (error) {
//     console.error("Error creating profile:", error);
//   }
// });

// app.post("/api/userprofile/:id", async (req, res) => {
//   const { id } = req.params;
//   const { firstname, lastname, gender, email, password, name, rolename } = req.body;
//   try {
//     const updateValues = { firstname, lastname, gender, email, name, rolename };
//     if (password) {
//       updateValues.password = password;
//     }
//     await UserProfile.update(updateValues, { where: { id } });
//     const updatedProfile = await UserProfile.findByPk(id);
//     res.json(updatedProfile);
//   } catch (error) {
//     console.error("Error updating profile:", error);
//     res.status(500).send("Error updating profile.");
//   }
// });

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

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res
      .status(500)
      .json({ error: "An error occurred while resetting password" });
  }
});

app.listen(5000);







// // // // import React, { useState, useEffect } from "react";
// // // // import "../../css/comment.css"; // Import your custom CSS file for styling

// // // // const Comment = () => {
// // // //   const [comment, setComment] = useState("");
// // // //   const [comments, setComments] = useState([]);
// // // //   const [parentId, setParentId] = useState('')
// // // //   const [showReplyForm, setShowReplyForm] = useState(false);
// // // //   const [replyText, setReplyText] = useState('');

// // // //   useEffect(() => {
// // // //     fetchComments();
// // // //   }, []);

// // // //   const fetchComments = async () => {
// // // //     try {
// // // //       const response = await fetch("http://localhost:5000/api/comments"); // Update with your API endpoint
// // // //       const data = await response.json();
// // // //       setComments(data);
// // // //     } catch (error) {
// // // //       console.error("Error fetching comments:", error);
// // // //     }
// // // //   };

// // // //   const handleCommentChange = (event) => {
// // // //     setComment(event.target.value);
// // // //   };
// // // //   const handleReplyTextChange = (event) => {
// // // //     setReplyText(event.target.value);
// // // //     // setShowReplyForm(false);
// // // //   };

// // // //   const handlePostComment = async () => {
// // // //     try {
// // // //       const response = await fetch("http://localhost:5000/api/comments", {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         body: JSON.stringify({
// // // //           text: comment,
// // // //           user_id: 1, // Replace with the actual user ID
// // // //           user_name: "John Doe", // Replace with the actual user name
// // // //           parent_id: parentId, // Replace with the actual parent ID if applicable
// // // //         }),
// // // //       });

// // // //       if (response.ok) {
// // // //         fetchComments(); // Fetch comments again to update the UI
// // // //         setComment(""); // Clear the input field after posting
// // // //       } else {
// // // //         console.error("Error posting comment:", response.statusText);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error posting comment:", error);
// // // //     }
// // // //   };
// // // //   const handleReplyClick = (commentId) => {
// // // //     setShowReplyForm(true);
// // // //     setParentId(commentId);

// // // //   };
// // // //   return (
// // // //     <>

// // // //       <textarea
// // // //         className="comment-input"
// // // //         placeholder="Write your comment..."
// // // //         value={comment}
// // // //         onChange={handleCommentChange}
// // // //       />
// // // //       {/* <button className="comment-button" onClick={handlePostComment}>
// // // //          Post Comment
// // // //        </button> */}

// // // //       <button className="comment-button" onClick={handlePostComment}>
// // // //         {showReplyForm ? "Post Reply" : "Post Comment"}
// // // //       </button>

// // // //       <div className="comment-list">
// // // //         {comments.map((comment) => (
// // // //           <>
// // // //             <div key={comment.id} className="comment">
// // // //               <p>{comment.text}</p>
// // // //               <p>Posted by: {comment.user_name}</p>
// // // //             </div>
// // // //             <button className="reply-button" onClick={() => handleReplyClick(comment.id)}>
// // // //               Reply
// // // //             </button>
// // // //             {parentId === comment.id && (
// // // //               <div className="nested-comment">
// // // //                 <textarea
// // // //                   className="comment-input"
// // // //                   placeholder="Write your comment..."
// // // //                   value={comment}
// // // //                   onChange={handleCommentChange}
// // // //                 />

// // // //                 <button className="comment-button" onClick={handlePostComment}>
// // // //                   Post Comment
// // // //                 </button>
// // // //               </div>
// // // //             )}
// // // //           </>
// // // //         ))}
// // // //       </div>



// // // //     </>
// // // //   );
// // // // };
// // // // export default Comment


// // // // import React, { useState, useEffect } from "react";
// // // // import axios from 'axios';
// // // // import "../../css/comment.css";
// // // // const Comment = () => {
// // // //   const [comment, setComment] = useState("");
// // // //   const [comments, setComments] = useState([]);
// // // //   const [parentId, setParentId] = useState('')
// // // //   const [showReplyForm, setShowReplyForm] = useState(false);


// // // //   useEffect(() => {
// // // //     fetchComments();
// // // //   }, []);

// // // //   const fetchComments = async () => {
// // // //     try {
// // // //       const response = await fetch("http://localhost:5000/api/comments"); // Update with your API endpoint
// // // //       const data = await response.json();
// // // //       setComments(data);
// // // //     } catch (error) {
// // // //       console.error("Error fetching comments:", error);
// // // //     }
// // // //   };
// // // //   const handleReply = (parentid) => {
// // // //     setShowReplyForm(true);
// // // //     setComment("");
// // // //     setParentId(parentid);
// // // //     console.log("Parentid", parentid);
// // // //   }
// // // //   const handlePostComment = async () => {
// // // //     try {
// // // //       const response = await axios.post("http://localhost:5000/api/comments", {
// // // //         text: comment,
// // // //         user_id: 1,
// // // //         user_name: "John Doe",
// // // //         parent_id: null,
// // // //       });

// // // //       if (response.status === 200) {
// // // //         fetchComments();
// // // //         setComment("");
// // // //         setShowReplyForm(false);
// // // //         setParentId('');
// // // //       } else {
// // // //         console.error("Error posting comment:", response.statusText);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error posting comment:", error);
// // // //     }
// // // //   };


// // // //   return (
// // // //     <>
// // // //       {parentId == '' ? (<>
// // // //         < textarea
// // // //           className="comment-input"
// // // //           placeholder="Write your comment..."
// // // //           value={comment}
// // // //           onChange={(e) => setComment(e.target.value)}
// // // //         />
// // // //         <button className="comment-button" onClick={handlePostComment}>
// // // //           {showReplyForm ? "Post Reply" : "Post Comment"}
// // // //         </button>

// // // //         <div className="comment-list">
// // // //           {comments.map((comment, index) => (
// // // //             <>
// // // //               <div key={index} className={parentId === comment.parent_id ? "nested-comment" : "comment"}>
// // // //                 <p>{comment.text}</p>
// // // //                 <p>Posted by: {comment.user_name}</p>
// // // //               </div>
// // // //               <button onClick={() => handleReply(comment.id)}>Reply</button>
// // // //             </>
// // // //           ))}
// // // //         </div></>) : (<>
// // // //           <span
// // // //             style={{ wordWrap: "break-word" }}
// // // //           >
// // // //             {comment.name}
// // // //           </span>
// // // //         </>)


// // // //       }
// // // //       < div className="nested2-comment">
// // // //         {comment?.items?.map((comment, index) => {
// // // //           return <Comment key={comment.id} />
// // // //         })}
// // // //       </div >
// // // //     </>

// // // //   )



// // // // };



// // // // export default Comment






// // // import React, { useState, useEffect } from "react";
// // // import axios from 'axios';
// // // import "../../css/comment.css";


// // // const Comment = () => {
// // //   const [comment, setComment] = useState("");
// // //   const [comments, setComments] = useState([]);

// // //   useEffect(() => {
// // //     fetchComments();
// // //   }, []);

// // //   const fetchComments = async () => {
// // //     try {
// // //       const response = await fetch("http://localhost:5000/api/comments");
// // //       const data = await response.json();
// // //       setComments(data);
// // //     } catch (error) {
// // //       console.error("Error fetching comments:", error);
// // //     }
// // //   };

// // //   const handlePostComment = async (parent_id = null) => {
// // //     try {
// // //       const response = await axios.post("http://localhost:5000/api/comments", {
// // //         text: comment,
// // //         user_id: 1,
// // //         user_name: "John Doe",
// // //         parent_id: parent_id,
// // //       });

// // //       if (response.status === 200) {
// // //         fetchComments();
// // //         setComment("");
// // //       } else {
// // //         console.error("Error posting comment:", response.statusText);
// // //       }
// // //     } catch (error) {
// // //       console.error("Error posting comment:", error);
// // //     }
// // //   };

// // //   // Helper function to get nested comments for a parent comment id
// // //   const getNestedComments = (parentCommentId) => {
// // //     return comments.filter(comment => comment.parent_id === parentCommentId);
// // //   };

// // //   return (
// // //     <div className="comment-container">
// // //       <textarea
// // //         className="comment-input"
// // //         placeholder="Write your comment..."
// // //         value={comment}
// // //         onChange={(e) => setComment(e.target.value)}
// // //       />
// // //       <button className="comment-button" onClick={() => handlePostComment()}>
// // //         Post Comment
// // //       </button>

// // //       <div className="comment-list">
// // //         {comments.filter(comment => comment.parent_id === null).map((comment) => (
// // //           <div key={comment.id} className="comment">
// // //             <p>{comment.text}</p>
// // //             <p>Posted by: {comment.user_name}</p>
// // //             <button onClick={() => handlePostComment(comment.id)}>Reply</button>
// // //             <div className="nested-comments">
// // //               {getNestedComments(comment.id).map((nestedComment) => (
// // //                 <>
// // //                   <Comment key={nestedComment.id}></Comment>
// // //                   <div key={nestedComment.id} className="comment nested-comment">
// // //                     <p>{nestedComment.text}</p>
// // //                     <p>Posted by: {nestedComment.user_name}</p>
// // //                   </div>
// // //                 </>

// // //               ))}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>
// // //     </div >
// // //   );
// // // };

// // // export default Comment;
// // import React, { useState, useEffect } from "react";
// // import axios from 'axios';
// // import "../../css/comment.css";

// // const Comment = () => {
// //   const [comment, setComment] = useState("");
// //   const [comments, setComments] = useState([]);
// //   const [replyMode, setReplyMode] = useState(false); // New state to track reply mode

// //   useEffect(() => {
// //     fetchComments();
// //   }, []);

// //   const fetchComments = async () => {
// //     try {
// //       const response = await fetch("http://localhost:5000/api/comments");
// //       const data = await response.json();
// //       setComments(data);
// //     } catch (error) {
// //       console.error("Error fetching comments:", error);
// //     }
// //   };

// //   const handlePostComment = async (parent_id = null) => {
// //     try {
// //       const response = await axios.post("http://localhost:5000/api/comments", {
// //         text: comment,
// //         user_id: 1,
// //         user_name: "John Doe",
// //         parent_id: parent_id,
// //       });

// //       if (response.status === 200) {
// //         fetchComments();
// //         setComment("");
// //         setReplyMode(false); // Reset reply mode after posting
// //       } else {
// //         console.error("Error posting comment:", response.statusText);
// //       }
// //     } catch (error) {
// //       console.error("Error posting comment:", error);
// //     }
// //   };

// //   return (
// //     <div className="comment-container">
// //       <textarea
// //         className="comment-input"
// //         placeholder="Write your comment..."
// //         value={comment}
// //         onChange={(e) => setComment(e.target.value)}
// //       />
// //       <button className="comment-button" onClick={() => handlePostComment()}>
// //         Post Comment
// //       </button>

// //       <div className="comment-list">
// //         {comments.filter(comment => comment.parent_id === null).map((comment) => (
// //           <div key={comment.id} className="comment">
// //             <p>{comment.text}</p>
// //             <p>Posted by: {comment.user_name}</p>
// //             {!replyMode && (
// //               <button onClick={() => setReplyMode(comment.id)}>Reply</button>
// //             )}
// //             {replyMode === comment.id && (
// //               <>
// //                 <textarea
// //                   className="comment-input"
// //                   placeholder="Write your reply..."
// //                   value={comment}
// //                   onChange={(e) => setComment(e.target.value)}
// //                 />
// //                 <button onClick={() => handlePostComment(comment.id)}>Post Reply</button>
// //               </>
// //             )}
// //             <div className="nested-comments">
// //               {comments
// //                 .filter(nestedComment => nestedComment.parent_id === comment.id)
// //                 .map(nestedComment => (
// //                   <div key={nestedComment.id} className="comment nested-comment">
// //                     <p>{nestedComment.text}</p>
// //                     <p>Posted by: {nestedComment.user_name}</p>
// //                   </div>
// //                 ))}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Comment;


// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "../../css/comment.css";

// const Comment = () => {
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [replyMode, setReplyMode] = useState({ id: null, text: "" });
//   const [replyMode2, setReplyMode2] = useState({ id: null, text: "" });

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/comments");
//       const data = await response.json();
//       setComments(data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handlePostComment = async (parent_id = null) => {
//     try {
//       let replyText = "";
//       if (replyMode && replyMode.id === parent_id) {
//         replyText = replyMode.text;
//         setReplyMode({ id: null, text: "" }); // Reset reply mode after posting
//       }

//       const response = await axios.post("http://localhost:5000/api/comments", {
//         // text: comment,
//         text: replyText || comment,
//         user_id: 1,
//         user_name: "John Doe",
//         parent_id: parent_id,
//       });

//       if (response.status === 200) {
//         fetchComments();
//         setComment("");
//         setReplyMode({ id: null, text: "" }); // Reset reply mode after posting
//       } else {
//         console.error("Error posting comment:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error posting comment:", error);
//     }
//   };
//   //console.log("reply mode: " + replyMode)
//   return (
//     <div className="comment-container">
//       <textarea
//         className="comment-input"
//         placeholder="Write your comment..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />
//       <button className="comment-button" onClick={() => handlePostComment()}>
//         Post Comment
//       </button>

//       <div className="comment-list">
//         {comments.filter(comment => comment.parent_id === null).map((comment) => (
//           <div key={comment.id} className="comment">
//             <p>{comment.text}</p>
//             <p>Posted by: {comment.user_name}</p>
//             {!replyMode.id && (
//               <button onClick={() => setReplyMode({ id: comment.id, text: "" })}>
//                 Reply
//               </button>
//             )}
//             {replyMode.id === comment.id && (
//               <>
//                 <textarea
//                   className="comment-input"
//                   placeholder="Write your reply..."
//                   value={replyMode.text}
//                   onChange={(e) =>
//                     setReplyMode({ id: comment.id, text: e.target.value })
//                   }
//                 />
//                 <button onClick={() => handlePostComment(comment.id)}>Post Reply</button>
//               </>
//             )}
//             <div className="nested-comments">
//               {comments
//                 .filter(nestedComment => nestedComment.parent_id === comment.id)
//                 .map(nestedComment => (
//                   <div key={nestedComment.id} className="comment nested-comment">
//                     <p>{nestedComment.text}</p>
//                     <p>Posted by: {nestedComment.user_name}</p>

//                     <button onClick={() => setReplyMode2({ id: nestedComment.id, text: "" })} > Reply</button>
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comment;


// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "../../css/comment.css";

// const Comment = () => {
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);
//   const [replyMode, setReplyMode] = useState({ id: null, text: "" });
//   const [replyMode2, setReplyMode2] = useState({ id: null, text: "" });


//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/comments");
//       const data = await response.json();
//       setComments(data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handlePostComment = async (parent_id = null) => {
//     try {
//       let replyText = "";
//       if (replyMode && replyMode.id === parent_id) {
//         replyText = replyMode.text;
//         setReplyMode({ id: null, text: "" });
//       }
//       let replytext2 = "";
//       if (replyMode2 && replyMode2.id === parent_id) {
//         replytext2 = replyMode2.text;
//         setReplyMode2({ id: null, text: "" });
//       }

//       const response = await axios.post("http://localhost:5000/api/comments", {
//         //  text: replyText || comment,
//         text: replyText || replytext2 || comment,
//         user_id: 1,
//         user_name: "John Doe",
//         parent_id: parent_id,
//       });

//       if (response.status === 200) {
//         fetchComments();
//         setComment("");
//       } else {
//         console.error("Error posting comment:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error posting comment:", error);
//     }
//   };

//   return (
//     <div className="comment-container">
//       <textarea
//         className="comment-input"
//         placeholder="Write your comment..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />
//       <button className="comment-button" onClick={() => handlePostComment()}>
//         Post Comment
//       </button>

//       <div className="comment-list">
//         {comments.filter(comment => comment.parent_id === null).map((comment) => (
//           <div key={comment.id} className="comment">
//             <p>{comment.text}</p>
//             <p>Posted by: {comment.user_name}</p>
//             {!replyMode.id && (
//               <button onClick={() => setReplyMode({ id: comment.id, text: "" })}>
//                 Reply
//               </button>
//             )}
//             {replyMode.id === comment.id && (
//               <>
//                 <textarea
//                   className="comment-input"
//                   placeholder="Write your reply..."
//                   value={replyMode.text}
//                   onChange={(e) =>
//                     setReplyMode({ id: comment.id, text: e.target.value })
//                   }
//                 />
//                 <button onClick={() => handlePostComment(comment.id)}>Post Reply</button>
//               </>
//             )}
//             <div className="nested-comments">
//               {comments
//                 .filter(nestedComment => nestedComment.parent_id === comment.id)
//                 .map(nestedComment => (
//                   <div key={nestedComment.id} className="comment nested-comment">
//                     <p>{nestedComment.text}</p>
//                     <p>{nestedComment.id}</p>

//                     <p>Posted by: {nestedComment.user_name}</p>
//                     {!replyMode2.id && (
//                       <button onClick={() => setReplyMode2({ id: nestedComment.id, text: "" })}>
//                         Reply
//                       </button>
//                     )}
//                     {replyMode2.id === nestedComment.id && (
//                       <>
//                         <textarea
//                           className="comment-input"
//                           placeholder="Write your reply..."
//                           value={replyMode2.text}
//                           onChange={(e) =>
//                             setReplyMode2({ id: nestedComment.id, text: e.target.value })
//                           }
//                         />
//                         <button onClick={() => handlePostComment(nestedComment.id)}>Post Reply</button>
//                       </>
//                     )}
//                   </div>
//                 ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comment;


// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "../../css/comment.css";

// const Comment = () => {
//   const [comment, setComment] = useState("");
//   const [comments, setComments] = useState([]);

//   useEffect(() => {
//     fetchComments();
//   }, []);

//   const fetchComments = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/comments");
//       const data = await response.json();
//       setComments(data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handlePostComment = async (text, parent_id = null) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/comments", {
//         text,
//         user_id: 1,
//         user_name: "John Doe",
//         parent_id: parent_id,
//       });

//       if (response.status === 200) {
//         fetchComments();
//         setComment("");
//       } else {
//         console.error("Error posting comment:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error posting comment:", error);
//     }
//   };

//   const CommentItem = ({ comment }) => {
//     const [replyText, setReplyText] = useState("");

//     const handlePostReply = () => {
//       handlePostComment(replyText, comment.id);
//       setReplyText("");
//     };

//     return (
//       <div className="comment">
//         <p>{comment.text}</p>
//         <p>Posted by: {comment.user_name}</p>
//         <button onClick={() => setReplyText("")}>Reply</button>

//         {replyText && (
//           <>
//             <textarea
//               className="comment-input"
//               placeholder="Write your reply..."
//               value={replyText}
//               onChange={(e) => setReplyText(e.target.value)}
//             />
//             <button onClick={handlePostReply}>Post Reply</button>
//           </>
//         )}
//         <div className="nested-comments">
//           {comments
//             .filter(nestedComment => nestedComment.parent_id === comment.id)
//             .map(nestedComment => (
//               <CommentItem key={nestedComment.id} comment={nestedComment} />
//             ))}
//         </div>
//       </div>
//     );
//   };

//   return (
//     <div className="comment-container">
//       <textarea
//         className="comment-input"
//         placeholder="Write your comment..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />
//       <button className="comment-button" onClick={() => handlePostComment(comment)}>
//         Post Comment
//       </button>

//       <div className="comment-list">
//         {comments.filter(comment => comment.parent_id === null).map((comment) => (
//           <CommentItem key={comment.id} comment={comment} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comment;


import React, { useState, useEffect } from "react";
import axios from 'axios';
import "../../css/comment.css";

const Comment = () => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/comments");
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const handlePostComment = async (text, parent_id = null) => {
    try {
      const response = await axios.post("http://localhost:5000/api/comments", {
        text,
        user_id: 1,
        user_name: "John Doe",
        parent_id: parent_id,
      });

      if (response.status === 200) {
        fetchComments();
        setComment("");
      } else {
        console.error("Error posting comment:", response.statusText);
      }
    } catch (error) {
      console.error("Error posting comment:", error);
    }
  };

  const CommentItem = ({ comment }) => {
    const [replyText, setReplyText] = useState("");

    const handlePostReply = () => {
      console.log("????????????????")
      handlePostComment(replyText, comment.id);
      setReplyText("");
    };

    return (
      <div className="comment">
        <p>{comment.text}</p>
        <p>Posted by: {comment.user_name}</p>
        <button onClick={() => setReplyText("")}>Reply</button>
        {replyText && (
          <>
            <textarea
              className="comment-input"
              placeholder="Write your reply..."
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
            />
            <button className="abc" onClick={handlePostReply}>Post Reply</button>

          </>
        )}
        <div className="nested-comments">
          {comments
            .filter(nestedComment => nestedComment.parent_id === comment.id)
            .map(nestedComment => (
              <CommentItem key={nestedComment.id} comment={nestedComment} />
            ))}
        </div>
      </div>
    );
  };

  return (
    <div className="comment-container">
      <textarea
        className="comment-input"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      />
      <button className="comment-button" onClick={() => handlePostComment(comment)}>
        Post Comment
      </button>

      <div className="comment-list">
        {comments.filter(comment => comment.parent_id === null).map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
};

export default Comment;

// import React, { useState, useEffect } from "react";
// import axios from 'axios';
// import "../../css/comment.css";
// import '../../css/Blog/Avatar.css';
// import Avatar from "./Avatar";
// import Picker from 'emoji-picker-react';
// import data from 'emoji-picker-react';

// const Comment = () => {
//   const [comment, setComment] = useState("");
//   const [replyText, setReplyText] = useState("");
//   const [isReplying, setIsReplying] = useState(false);
//   const [comments, setComments] = useState([]);
//   const [isPickervisible, setIsPickervisible] = useState(false);
//   const [currentEmoji, setCurrentEmoji] = useState(null);
//   useEffect(() => {
//     fetchComments();
//   }, []);
//   console.log(isPickervisible)
//   const fetchComments = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/comments");
//       const data = await response.json();
//       setComments(data);
//     } catch (error) {
//       console.error("Error fetching comments:", error);
//     }
//   };

//   const handlePostComment = async (text, parent_id = null) => {
//     try {
//       const response = await axios.post("http://localhost:5000/api/comments", {
//         text,
//         user_id: 1,
//         user_name: "John Doe",
//         parent_id: parent_id,
//       });

//       if (response.status === 200) {
//         fetchComments();
//         setComment("");
//       } else {
//         console.error("Error posting comment:", response.statusText);
//       }
//     } catch (error) {
//       console.error("Error posting comment:", error);
//     }
//   };

//   const CommentItem = ({ comment }) => {
//     console.log(isPickervisible)
//     console.log("zvcg" + isReplying)
//     const handlePostReply = () => {
//       debugger
//       handlePostComment(replyText, comment.id);
//       setReplyText("");
//       setIsReplying(false);
//     };
//     const showHide = () => {
//       debugger
//       setIsPickervisible(!isPickervisible)
//     }

//     return (

//       <div className="comment">
//         <div className="aavtar" style={{ display: 'flex', color: "#999" }}>
//           <Avatar username={comment.user_name} userId={comment.id} />
//           {comment.user_name}
//         </div >

//         <div style={{ fontSize: '18px', color: "#333" }}>{comment.text}</div>



//         {!isReplying && (
//           <>
//             {/* <button onClick={() => setIsReplying(true)} className="reply-button">Reply</button> */}
//             <div onClick={() => setIsReplying(true)} style={{ color: "#999", size: "14px" }}>Reply</div>
//             <div style={{ padding: "5px" }}></div>
//           </>
//         )}
//         {isReplying && (
//           <>

//             <div className="keyboard">
//               <div>
//                 <textarea
//                   className="comment-input"
//                   placeholder="Write your reply..."
//                   value={replyText}
//                   onChange={(e) => setReplyText(e.target.value)}
//                 />
//               </div>
//               <button type="button" className="emoji-picker" onClick={showHide}>
//                 Emoji Picker</button>
//             </div>


//             {/* <button className="abc" onClick={(e) => { e.stopPropagation(); handlePostReply }}>Post Reply</button> */}
//             <button type="button" className="abc" onClick={handlePostReply}>Post Reply</button>
//             {isPickervisible && (
//               <div>
//                 <Picker
//                   data={data}
//                   previewPosition="none"
//                   onEmojiSelect={(e) => {

//                     // setCurrentEmoji(e.native);
//                     //  setIsPickervisible(false);
//                   }
//                   }
//                 />
//               </div>
//             )}

//           </>

//         )
//         }

//         <div className="nested-comments">
//           {comments
//             .filter(nestedComment => nestedComment.parent_id === comment.id)
//             .map(nestedComment => (
//               <CommentItem key={nestedComment.id} comment={nestedComment} />
//             ))}
//         </div>
//       </div >
//     );
//   };

//   return (
//     <div className="comment-container">
//       <textarea
//         className="comment-input"
//         placeholder="Write your comment..."
//         value={comment}
//         onChange={(e) => setComment(e.target.value)}
//       />
//       <button className="comment-button" onClick={() => handlePostComment(comment)}>
//         Post Comment
//       </button>

//       <div className="comment-list">
//         {comments.filter(comment => comment.parent_id === null).map((comment) => (
//           <CommentItem key={comment.id} comment={comment} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Comment;