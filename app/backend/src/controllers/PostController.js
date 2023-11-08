const Post = require("../model/PostModel");
const asyncHandler = require("express-async-handler");

const PostUpload = async(req,res)=>{
    const {title,content} = req.body;
    const user_id = req.user.id;
    if(!title || !content)
    {
        res.status(400);
        throw new Error("All Fields are mandotory");
    }

    try{
        const post = await Post.create(
            {
                userid:user_id,
                title:title,
                content:content
               
            }
        )
        console.log(post);
        
        if (post) {
            res.status(200).json({ __id: post.userid, title: post.title, content: post.content })
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

module.exports = {PostUpload}