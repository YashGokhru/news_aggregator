const User = require("../model/UserModel");
const Post = require("../model/PostModel");
const asyncHandler = require("express-async-handler");
const path = require('path');

const SearchByKeyword = async (req, res) => {
    const keyword = req.params.keyword;
  
    try {
      // Find posts that contain the keyword in the title or content
      const posts = await Post.find({
        $or: [
          { title: { $regex: keyword, $options: 'i' } }, // Case-insensitive search
          { content: { $regex: keyword, $options: 'i' } }
        ]
      });

      // Extract user IDs from posts
    const userIds = posts.map(post => post.userid);

    // Retrieve user details based on user IDs
    const users = await User.find({ _id: { $in: userIds } }, 'name');

    
    const postsWithUsernames = posts.map(post => {
      const user = users.find(user => user._id.equals(post.userid));
      
      return {
        _id: post._id,
        title: post.title,
        upvote: post.upvote,
        downvote: post.downvote,
        noofreplies: post.noofreplies,
        username: user.name,
        userid : user._id
      };
    });

    return res.status(200).send(postsWithUsernames);
    } catch (error) {
      console.error(error);
     return res.status(500).send('Internal Server Error');
    }


    
  };

  //controller for searching by username
  const SearchByUsername = async (req, res) => {
    const { username } = req.params;
  
    try {
      // Find the user by username
      const users = await User.find({ name: { $regex: username, $options: 'i' } })
  
      if (!users) {
        return res.status(404).json({ error: 'User not found' });
      }
  
    const postIds = users.reduce((acc, user) => acc.concat(user.posts), []);
    
    const postDetails = await Post.find({ _id: { $in: postIds } });
    console.log(postDetails);
    const postsWithUsername = postDetails.map(post => {

      const user = users.find(u => u.posts.includes(post._id));
      
      return{
      _id: post._id,
        title: post.title,
        upvote: post.upvote,
        downvote: post.downvote,
        noofreplies: post.noofreplies,
      username: user.name,  // Include all other properties of the post
      userid : post.userid
    }});

    res.json(postsWithUsername);

    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
    SearchByKeyword,
    SearchByUsername
}