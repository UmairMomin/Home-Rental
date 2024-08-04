const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const Posts = require("../model/postModel");

router.get("/",(req,res)=>{
    res.render('dashboard');
});

module.exports = router;