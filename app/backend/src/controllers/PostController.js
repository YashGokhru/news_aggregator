const Post = require("../model/PostModel");
const asyncHandler = require("express-async-handler");
const path = require('path');


const PostUpload = async(req,res)=>{
    const {title,content} = req.body;
    const user_id = req.user.id;
    console.log(user_id);
    if(!title || !content)
    {
        res.status(400);
        throw new Error("All Fields are mandotory");
    }
    const imagePath = req.file.path;

    try{
        const post = await Post.create(
            {
                userid:user_id,
                title:title,
                content:content,
                imagePath: imagePath,
               
            }
        )
        console.log(post);
        
        if (post) {
            const savedPost = await post.save();

        res.status(201).json(savedPost);
        }
        else {
            res.status(400);
            throw new Error("User Data is not valid");
        }

    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }


}
const GetPost =  async (req, res) => {
    try {
        const userId = req.params.userId;
        const userPosts = await Post.find({ userid: userId });

        // Render a view (you need to have a view engine set up, like EJS, Handlebars, or Pug)
        res.render('userPosts', { posts: userPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    PostUpload,
    GetPost
}