const express = require("express");
// const blogController = require("../controllers/blogController");
const blogController = require("../controllers/blogController");
const router = express.Router();

router.get("/", blogController.getAllBlogs);
router.get("/:id", blogController.getBlogById);
router.post("/", blogController.createBlog);
router.post("/:id", blogController.updateBlog);
router.delete("/:id", blogController.deleteBlog);

module.exports = router;
