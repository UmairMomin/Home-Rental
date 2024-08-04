const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.urlencoded({ extended: true }));


router.get("/", (req,res)=>{
    res.render('home');
});

router.get("/iam", (req,res)=>{
    res.render('iam');
});


router.get("/test/prod_details", (req,res)=>{
    res.render('product-details')
});

module.exports = router;