const Posts = require("../model/postModel");

const get_posts = async (req, res) => {
  try {
    const postData = await Posts.find();
    res.render("admin", { data: postData, user: req.user.userData });
  } catch (error) {
    res.send(error);
  }
};

const delete_posts = async (req, res) => {
  try {
    const postId = req.params.id;
    await Posts.deleteOne({ _id: postId });
    const postData = await Posts.find();
    res.render("admin", { data: postData, user: req.user.userData });
  } catch (err) {
    res.send(err);
  }
};

const update_posts = async (req, res) => {
  try {
    const postId = req.params.id;
    const postData = await Posts.findById(postId);
    res.render("form", { msg: false, user: req.user, data: postData });
  } catch (err) {
    res.send(err);
  }
};

module.exports = {
  get_posts,
  delete_posts,
  update_posts,
};
