const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));
const {verifyToken} = require("../middleware/auth")


router.get("/", (req,res)=>{
    res.render('home');
});

router.get("/iam", verifyToken, (req,res)=>{
    res.render('iam');
});


router.get("/test/prod_details", (req,res)=>{
    res.render('product-details')
});

module.exports = router;