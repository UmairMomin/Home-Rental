const Posts = require("../model/postModel");

const get_posts = async (req,res)=>{
    try{
        const postData = await Posts.find();
        // res.send(postData)
        res.render('dashboard',{ data: postData })
    }
    catch(error){
        res.send(error);
    }
}

const add_posts = async (req,res)=>{
    try{
        const posts = new Posts({
            Name: req.body.name,
            Category:req.body.category,
            Address:req.body.address,
            Description:req.body.description,
            ImageURL:req.body.image,
            Price:req.body.price,
        })
    
        await posts.save();
        res.render('form',{msg:true});

    }
    catch(error){
     res.send(error);
    }
 };

module.exports = {
    add_posts,
    get_posts
}