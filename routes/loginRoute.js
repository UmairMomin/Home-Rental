const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const {
    loginUser
} = require("../controllers/loginController");

router.get("/", (req,res)=>{
    res.render('login');
});

router.post("/login", loginUser)

module.exports = router;
