const User = require("../model/UserModel");
const Post = require("../model/PostModel");
const asyncHandler = require("express-async-handler");
const path = require('path');


const CreatePost = async (req, res) => {
    const { title, content } = req.body;
    const user_id = req.user.id;
    console.log(user_id);
    if (!title || !content) {
        res.status(400);
        throw new Error("All Fields are mandotory");
    }
    // const imagePath = req.file.path;

    try {
        const post = await Post.create(
            {
                userid: user_id,
                title: title,
                content: content,
                imagePath: "abc"

            }
        )
        console.log(post);

        if (post) {
            post.save().then((post) => {
                User.findOneAndUpdate({ _id: user_id }, { $push: { posts: post._id } })
                    .then(() => {
                        console.log('Post added to user successfully');
                    })
                    .catch((err) => {
                        console.error('Error updating user:', err);
                    });
            });

            res.status(201).json({message:"Post Uploaded Succesfully"});
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
const GetPost = async (req, res) => {
    try {
        const userId = req.user.id;
        const userPosts = await Post.find({ userid: userId });

        res.json({ posts: userPosts }); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const DeletePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params._id;
        
        
        
        // Check if the user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Remove the postId from the user's posts array
        user.posts.pull(postId);
        await user.save();

        // Delete the post by its postId
        await Post.deleteOne({ _id: postId });
        
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const PostComment = async (req, res) => {
    const { comment } = req.body;

    if (!comment) {
        res.status(400).json({ error: "All fields are mandatory" });
        return;
    }

    try {
        const user = await User.findById(req.user.id);
        const post = await Post.findById(req.params._id);
        console.log("Post:",post);


        const newComment = {
            comment: req.body.comment,
            userid: req.user.id,
            name: user.name
        };

        // Use $push to add the new comment to the end of the 'comments' array
        await Post.updateOne({ _id: post}, { $push: { comments: newComment } });
        // await Post.save();

        res.status(200).json({message:"Comment Added Succesfully"});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const GetComment = async (req, res) => {
    try { 
 
        const postId = req.params._id; // Assuming you get the postId from the request parameters
        const post = await Post.findById(postId).select('comments');

        res.json({ comments: post.comments});
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
module.exports = {
    CreatePost,
    GetPost,
    DeletePost,
    PostComment,
    GetComment
}