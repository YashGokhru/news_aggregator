const User = require("../model/UserModel");
const Post = require("../model/PostModel");
const Comment = require("../model/CommentModel");
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

    try {
        const post = await Post.create(
            {
                userid: user_id,
                title: title,
                content: content,

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

            res.status(201).json({ message: "Post Uploaded Succesfully" });
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
        if (!postId) {

            return res.status(404).json({ error: 'Post not found' });
        }


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
        const PostId = req.params._id;
        if (!PostId) {

            return res.status(404).json({ error: 'Post not found' });
        }
        const post = await Post.findById(PostId);
        console.log("Post:", post);


        const newComment = {
            userid: req.user.id,
            parentid : null,
            content: comment,
            noofreplies:0,
            upvote: 0,
            downvote: 0
        };
        
        const createdComment = await Comment.create(newComment);
        const createdCommentId = createdComment._id; // Accessing the ID of the created comment
        console.log("New comment created:", createdComment.content);
        console.log("New comment ID:", createdCommentId); // Logging the ID
        
        await Post.updateOne(
          { _id: post }, 
          { 
            $push: { replies: createdCommentId },
            $inc: { noofreplies: 1 } // Incrementing the noofreplies attribute by 1
          }
        );
          

        res.status(200).json({ message: "Comment Added Succesfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

const GetComment = async (req, res) => {         //get comments of particular post
    try {

        const postId = req.params._id;
        if (!postId) {

            return res.status(404).json({ error: 'Post not found' });
        }
    
        // Assuming you get the postId from the request parameters
        const post = await Post.findById(postId).select('replies noofreplies');

        res.json({post });

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