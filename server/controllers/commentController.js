const Comment = require("../models/Comment");
exports.getAllComments = async (req, res) => {
  try {
    const response = await Comment.findAll();
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
exports.createComment = async (req, res) => {
  const { text, user_id, user_name, parent_id } = req.body;
  try {
    const response = await Comment.create({
      text,
      user_id,
      user_name,
      parent_id,
    });
    res.json(response);
  } catch (err) {
    console.log(err);
  }
};
