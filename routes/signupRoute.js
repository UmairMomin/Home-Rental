const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));

const {
    register_user
} = require("../controllers/signupController");

router.post("/", (req,res)=>{
    res.render("signup",);
});

router.post("/register", register_user);

module.exports = router;