const User = require("../model/UserModel");
const Post = require("../model/PostModel");
const Comment = require("../model/CommentModel");
const CommentVote = require("../model/CommentVoting");
const PostVote = require("../model/PostVoting");
const asyncHandler = require("express-async-handler");
const path = require("path");
const mongoose = require("mongoose");

const CreatePost = async (req, res) => {
  const { title, content, link } = req.body;
  const user_id = req.user.id;
  // console.log(user_id);
  if (!title || !content) {
   return  res.status(400).send({error: "All Fields are mandatory" });
  }

  try {
    const post = await Post.create({
      userid: user_id,
      title: title,
      content: content,
      link: link,
    });
    console.log(post);

    if (post) {
      post.save().then((post) => {
        User.findOneAndUpdate({ _id: user_id }, { $push: { posts: post._id } })
          .then(() => {
            console.log("Post added to user successfully");
          })
          .catch((err) => {
            console.log("Error updating user:", err);
          });
      });
      const test = true;
      return res.status(201).send({ message: "Post Uploaded Successfully" , success : true});

    } else {
      res.status(400);
      throw new Error("User Data is not valid");
    }
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const GetPost = async (req, res) => {
  try {
    const reqid = req.params._id;
    const posts = await Post.find({userid : reqid}).select('userid title content upvote downvote noofreplies').lean(); // Fetch posts

        // Get unique user IDs from posts
        const userIds = req.params._id;

        // Fetch user details for all user IDs
        const users = await User.find({ _id : userIds }, 'name').lean();

        // Map user details to posts based on user IDs
        const postsWithUserDetails = posts.map(post => {
            const user = users.find(user => user._id.toString() === post.userid); // Find matching user
            return {
                ...post,
                user: user ? { name: user.name} : null // Add user details to post
            };
        });

        

        res.json({ posts: postsWithUserDetails, user : users }); // Send posts with user details

        // res.json(posts); 
        console.log("Posts array sent");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const DeletePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const postId = req.params._id;

    // Validate the postId
    if (!mongoose.Types.ObjectId.isValid(postId)) {
      return res.status(400).json({ error: "Invalid Post ID" });
    }

    // Check if the user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Remove the postId from the user's posts array
    user.posts.pull(postId);
    await user.save();

    // Delete the post by its postId
    await Post.deleteOne({ _id: postId });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const PostComment = async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    return res.status(400).send({ error: "All fields are mandatory" });
    
  }

  try {
    const user = await User.findById(req.user.id);
    const PostId = req.params._id;
    if (!PostId) {
      return res.status(404).json({ error: "Post not found" });
    }
    const post = await Post.findById(PostId);
    console.log("Post:", post);

    const newComment = {
      userid: req.user.id,
      postid: PostId,
      parentid: null,
      content: comment,
      noofreplies: 0,
      upvote: 0,
      downvote: 0,
    };

    const createdComment = await Comment.create(newComment);
    const createdCommentId = createdComment._id; // Accessing the ID of the created comment
    console.log("New comment created:", createdComment.content);
    console.log("New comment ID:", createdCommentId); // Logging the ID

    await Post.updateOne(
      { _id: PostId },
      {
        $push: { replies: createdCommentId },
        $inc: { noofreplies: 1 }, // Incrementing the noofreplies attribute by 1
      }
    );

   return res.status(200).send({ message: "Comment Added Succesfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: "Internal Server Error" });
  }
};

const GetComment = async (req, res) => {
  //get comments of particular post
  try {
    const postId = req.params._id;
    if (!postId) {
      return res.status(404).json({ error: "Post not found" });
    }

    const post = await Post.findById(postId)
      .select("replies noofreplies")
      .populate("replies");
    const updatedReplies = [];

    for (const reply of post.replies) {
      const user = await User.findOne({ _id: reply.userid })
        .select("name")
        .lean();

      if (user) {
        const updatedReply = { ...reply.toObject(), username: user.name };
        updatedReplies.push(updatedReply);
      }
    }
   
    res.json({ replies: updatedReplies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const GetAllComments = async (req, res) => {
  //get comments of comment
  try {
    const commId = req.params._id;
    if (!commId) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Fetch replies
    const replies = await Comment.find({ parentid: commId });

    // Extract user IDs from replies
    const userIds = replies.map((reply) => reply.userid);
    
    // Fetch users based on the extracted user IDs
    const users = await User.find({ _id: { $in: userIds } });
    
    // Create a map of user IDs to usernames for easy lookup
    const userIdToUsernameMap = {};
    users.forEach((user) => {
      userIdToUsernameMap[user._id] = user.name;
    });

    // Process the replies to include usernames
    const processedReplies = replies.map((reply) => ({
      ...reply.toObject(),
      username: userIdToUsernameMap[reply.userid], // Get the username from the map
      // Other fields you might need from the reply
    }));

    // Send the processed replies as the response
    res.json({ replies: processedReplies });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = {
  CreatePost,
  GetPost,
  DeletePost,
  PostComment,
  GetComment,
  GetAllComments,
};
