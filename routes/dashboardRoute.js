const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const Posts = require("../model/postModel");
const {
    add_posts,
    get_posts
} = require("../controllers/dashboardController")

router.get("/",get_posts);

router.get("/posts",(req,res)=>{
    res.render('form',{msg:false});
});

router.post("/posts/add", add_posts);

module.exports = router;