const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const Posts = require("../model/postModel");
const { get_products } = require("../controllers/prodDetailsController");
const { verifyToken, authenticateToken } = require("../middleware/auth");

// router.get("/", (req, res) => {
//   res.render("product-details", { user: req.user });
// });

router.get("/:id", get_products);

module.exports = router;

// localhost:3000/
