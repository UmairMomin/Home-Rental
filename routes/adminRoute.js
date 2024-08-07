const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const {
  verifyToken,
  authenticateToken,
  isAdmin,
} = require("../middleware/auth");
router.use(authenticateToken);

const {
  get_posts,
  delete_posts,
  update_posts,
} = require("../controllers/adminController");

router.get("/", verifyToken, isAdmin, get_posts);

router.get("/delete/:id", isAdmin, delete_posts);

router.get("/update/:id", isAdmin, update_posts);

module.exports = router;
