const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Verify JWT token
const verifyToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render("error", { msg: "Please Login to continue" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.send(err.message);
  }
};

// Get token details
function authenticateToken(req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        req.user = null;
      } else {
        req.user = decoded.userData;
      }
      next();
    });
  } catch (err) {
    res.send(err.message);
  }
}

// For Bcrypt password
const securePassword = async (password) => {
  try {
    const passwordHash = await bcryptjs.hash(password, 10);
    return passwordHash;
  } catch (error) {
    console.log(error.message);
  }
};

//Admin Middleware
const isAdmin = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.render("error", { msg: "Please Login to continue" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    if (req.user && req.user.role === "admin") {
      next();
    } else {
      res.render("error", { msg: "Admin Role Required" });
    }
    next();
  } catch (err) {
    res.send(err.message);
  }
};

module.exports = {
  securePassword,
  verifyToken,
  authenticateToken,
  isAdmin,
};
