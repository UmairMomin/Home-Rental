const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const { verifyToken, authenticateToken } = require("../middleware/auth");
router.use(authenticateToken);

router.get("/", (req, res) => {
  res.render("home", { user: req.user });
});

router.get("/iam", verifyToken, (req, res) => {
  res.render("iam", { user: req.user });
});

router.get("/prod_details", (req, res) => {
  res.render("product-details", { user: req.user });
});

router.get("/logout", authenticateToken, (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
