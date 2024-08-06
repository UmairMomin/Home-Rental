const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const Posts = require("../model/postModel");
const { add_posts, get_posts } = require("../controllers/dashboardController");
const { verifyToken, authenticateToken } = require("../middleware/auth");

router.get("/", get_posts);

router.get("/posts", verifyToken, (req, res) => {
  res.render("form", { msg: false, user: req.user });
});

router.post("/posts/add", verifyToken, add_posts);

module.exports = router;
