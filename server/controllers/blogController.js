const Blog = require("../models/Blog");

const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  "dotnet_SumitM",
  "dotnet_SumitM",
  "LYqNqV4QKK8w",
  {
    host: "40.114.69.227",
    dialect: "mysql",
  }
);
const { Op } = require("sequelize");

const multer = require("multer"); // Add this line to import multer

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

const upload = multer({ storage: storage }); // Create the upload middleware
// // Get all blogs
// const getAllBlogs = async (req, res) => {
//   try {
//     const blogs = await Blog.findAll();
//     res.json(blogs);
//   } catch (error) {
//     console.error("Error retrieving blogs:", error);
//     res.status(500).send("Error retrieving blogs.");
//   }
// };
// Get all blogs
const getAllBlogs = async (req, res) => {
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
};

// Get a specific blog by ID
const getBlogById = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await Blog.findByPk(id);
    if (!blog) {
      res.json("Blog not found");
    } else {
      res.json(blog);
    }
  } catch (error) {
    console.error("Error retrieving blog:", error);
    res.status(500).send("Error retrieving blog.");
  }
};

// Create a new blog
// const createBlog = async (req, res) => {
//   const { title, description } = req.body;
//   try {
//     const newBlog = await Blog.create({ title, description });
//     res.json(newBlog);
//   } catch (error) {
//     console.error("Error creating blog:", error);
//     res.status(500).send("Error creating blog.");
//   }
// };

const createBlog = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      res.status(500).send("Error uploading image.");
    } else {
      const { title, description } = req.body;
      const image = req.file; // Access the uploaded image file
      try {
        const newBlog = await Blog.create({
          title,
          description,
          image: image.filename,
        });
        res.json(newBlog);
      } catch (error) {
        console.error("Error creating blog:", error);
        res.status(500).send("Error creating blog.");
      }
    }
  });
};

// // Update a blog
// const updateBlog = async (req, res) => {
//   const { id } = req.params;
//   const { title, description } = req.body;
//   try {
//     await Blog.update({ title, description }, { where: { id } });
//     const updatedBlog = await Blog.findByPk(id);
//     res.json(updatedBlog);
//   } catch (error) {
//     console.error("Error updating blog:", error);
//     res.status(500).send("Error updating blog.");
//   }
// };

const updateBlog = async (req, res) => {
  upload.single("image")(req, res, async (err) => {
    if (err) {
      console.error("Error uploading image:", err);
      res.status(500).send("Error uploading image.");
    } else {
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
    }
  });
};

// Delete a blog
const deleteBlog = async (req, res) => {
  const { id } = req.params;
  try {
    await Blog.destroy({ where: { id } });
    res.json("Blog deleted successfully.");
  } catch (error) {
    console.error("Error deleting blog:", error);
    res.status(500).send("Error deleting blog.");
  }
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  updateBlog,
  deleteBlog,
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~SERVER~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~`````//

// app.get("/api/blog", async (req, res) => {
//   const page = parseInt(req.query.page) || 1; // Get the requested page from the query parameter
//   const perPage = 3; // Number of blogs per page
//   const offset = (page - 1) * perPage; // Calculate the offset
//   const searchTerm = req.query.search || "";
//   try {
//     const searchCondition = {
//       [Op.or]: [
//         { title: { [Op.like]: `%${searchTerm}%` } },
//         { description: { [Op.like]: `%${searchTerm}%` } },
//       ],
//     };
//     // Retrieve blogs from the database with pagination
//     const blogs = await Blog.findAll({
//       attributes: [
//         "id",
//         "title",
//         [
//           sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y"),
//           "createdAt",
//         ],
//         "description",
//         "image",
//       ],
//       where: searchCondition,
//       limit: perPage,
//       offset: offset,
//     });

//     // Count the total number of blogs
//     const totalCount = await Blog.count({ where: searchCondition });

//     res.json({
//       blogs,
//       totalPages: Math.ceil(totalCount / perPage),
//       currentPage: page,
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// app.get("/api/blog/search", async (req, res) => {
//   const { title } = req.query; // Get the title query parameter

//   try {
//     // Perform search by title
//     const blogs = await Blog.findAll({
//       attributes: [
//         "id",
//         "title",
//         [
//           sequelize.fn("DATE_FORMAT", sequelize.col("createdAt"), "%d-%m-%Y"),
//           "createdAt",
//         ],
//         "description",
//         "image",
//       ],
//       where: {
//         title: {
//           [Sequelize.Op.like]: `%${title}%`,
//         },
//       },
//     });

//     res.json({ blogs });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// });

// // app.post("/api/blog", upload.single("image"), async (req, res) => {
// //   const { title, description } = req.body;
// //   const image = req.file; // Access the uploaded image file
// //   try {
// //     const sql = await Blog.create({
// //       title,
// //       description,
// //       image: image.filename,
// //     });
// //     res.json(sql);
// //     console.log(req.image);
// //   } catch (err) {
// //     console.log(err);
// //   }
// // });

// app.get("/api/blog/:id", async (req, res) => {
//   const sql = await Blog.findByPk(req.params.id);
//   res.json(sql);
// });

// app.post("/api/blog/:id", upload.single("image"), async (req, res) => {
//   try {
//     const id = req.params.id;
//     const { title, description } = req.body;
//     const image = req.file; // Access the uploaded image file
//     await Blog.update(
//       { title, description, image: image.filename },
//       { where: { id: id } }
//     );
//     const updatedTask = await Blog.findByPk(id); // Retrieve the updated task from the database
//     res.json(updatedTask);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// app.delete("/api/blog/:id", async (req, res) => {
//   const id = req.params.id;
//   try {
//     await Blog.destroy({ where: { id: id } });
//     res.json("Deleted successfully");
//   } catch {
//     res.json("Error");
//   }
// });
