const User = require("../model/UserModel");
const Post = require("../model/PostModel");
const asyncHandler = require("express-async-handler");
const path = require('path');

const HomePage =  async (req, res) => {
    try {
        const posts = await Post.find().select('userid title content').lean(); // Fetch posts

        // Get unique user IDs from posts
        const userIds = posts.map(post => post.userid);

        // Fetch user details for all user IDs
        const users = await User.find({ _id: { $in: userIds } }, 'name').lean();

        // Map user details to posts based on user IDs
        const postsWithUserDetails = posts.map(post => {
            const user = users.find(user => user._id.toString() === post.userid); // Find matching user
            return {
                ...post,
                user: user ? { name: user.name} : null // Add user details to post
            };
        });

        

        res.json({ posts: postsWithUserDetails }); // Send posts with user details

        // res.json(posts); 
        console.log("Posts array sent");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const PostPage =  async (req, res) => {
    try {

        const postid = req.params._id;
        
        const post = await Post.findById(postid).lean();
        const useris = post.userid;
        const user = await User.findById(useris).select('_id name ');
        console.log(user);
        res.json({post,user}); 
        console.log("Post send");
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error for PostPage' });
    }
}
module.exports = {
    HomePage,
    PostPage
}