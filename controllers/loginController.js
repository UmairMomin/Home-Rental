const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginUser = async (req,res) => {
    try{
        const email = req.body.email;
        const password = req.body.password;

        const userData = await User.findOne({ email: email });

        if(userData){
            const passwordMatch = await bcryptjs.compare(password, userData.password);

            if(passwordMatch){
                const tokenData = await jwt.sign({ userData }, "JWT_SECRET", {
                    expiresIn: "1h",
                });
                
            }
            else {
                res.render('login', {pageTitle: "Login", msg: true, mesg: false});
            }
        }
        else {
            res.render('login', {pageTitle: "Login", msg: false, mesg: true});
        }
    }
    catch(error){
        res.send(error);
    }
};

module.exports = {
    loginUser
}