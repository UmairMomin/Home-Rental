const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const loginUser = async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });
        
        if(userData){
            const passwordMatch = await bcryptjs.compare(password, userData.password);

            if(passwordMatch){
                const tokenData = await jwt.sign({ userData }, process.env.JWT_SECRET, {
                    expiresIn: "1h",
                });
                res.cookie('token', tokenData, { httpOnly: true });
                res.redirect('/iam');
            }
            else {
                res.render("login",{ msg: true });
            }
        }
        else {
            res.render("login",{ msg: true });
        }
    }
    catch(error){
        res.send(error);
    }
};

module.exports = {
    loginUser
}