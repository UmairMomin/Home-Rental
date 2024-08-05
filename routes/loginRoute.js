const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const {
    loginUser
} = require("../controllers/loginController");

router.get("/", (req,res)=>{
    res.render('login', { msg: false });
});

router.post("/userlogin", loginUser)   //localhost:3000/login/userlogin

module.exports = router;


//localhost:3000/login