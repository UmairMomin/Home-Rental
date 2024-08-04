const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

// Verify JWT token
const verifyToken = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return res.json({ message: "Authentication token not found" });
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = decoded.userId; // Attach decoded payload to request object
      next();
    } catch (err) {
      res.send(err.message);
    }
  };

// For Bcrypt password
const securePassword = async (password) => {
    try {
      const passwordHash = await bcryptjs.hash(password, 10);
      return passwordHash;
    } catch (error) {
      console.log(error.message);
    }
  };


  module.exports = {
    securePassword,
    verifyToken
};