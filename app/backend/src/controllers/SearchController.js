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
  
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };

  //controller for searching by username
  const SearchByUsername = async (req, res) => {
    const username = req.params.username;
  
    try {
      // Find the user by username
      const user = await User.findOne({ name: username });
  
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      // Search for posts by user ID
      const posts = await Post.find({ user: user._id });
  
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };

  module.exports = {
    SearchByKeyword,
    SearchByUsername
}