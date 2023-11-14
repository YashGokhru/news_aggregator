const User = require("../model/UserModel");
const Post = require("../model/PostModel");
const asyncHandler = require("express-async-handler");
const path = require('path');


const PostUpload = async (req, res) => {
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
                imagePath: "abc",

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

            res.status(201);
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
        const userId = req.params.userId;
        const userPosts = await Post.find({ userid: userId });

        res.render('userPosts', { posts: userPosts });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const DeletePost = async (req, res) => {
    try {
        const userId = req.user.id;
        const postId = req.params.postid;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.posts.pull(postId);
        await user.save();

        await Post.deleteOne({ _id: postId });
        await Post.save();

        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


module.exports = {
    PostUpload,
    GetPost,
    DeletePost
}