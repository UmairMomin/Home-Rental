const {securePassword} = require("../middleware/auth");
const User = require("../model/userModel");

const register_user = async (req,res)=>{
   try{
    let spassword = await securePassword(req.body.password);
    
    const user = new User({
        Name: req.body.name,
        email: req.body.email,
        password: spassword,
    })

    const userData = await User.findOne({ email: req.body.email });

    if (userData){
        res.render("signup",{ msg : true });
    }
    else{
        const user_data = await user.save();
        res.redirect('/');
    }
   }
   catch(error){
    res.send(error);
   }
};

module.exports = {
    register_user
};