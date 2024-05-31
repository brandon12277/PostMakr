const Post  = require("./../models/post")
const mongoose = require("mongoose")















exports.MakePost = async (req,res) => {

   try{
    

    
   

   
    
    
    
    const post = await Post.create(req.body)

    


    
    

    res.status(201).json({ message: 'Posted'});

    
   }
   catch(err){
    console.log(err)
    res.status(400).json("Error")
   }
   
}

exports.GetPosts = async (req,res) => {

    const posts = await Post.find();
     
    return res.status(201).json(posts)

}