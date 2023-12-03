const PostVote = require("../model/PostVoting");
const User = require("../model/UserModel");
const Post = require("../model/PostModel");
const asyncHandler = require("express-async-handler");
const path = require('path');

const Home = async(req, res) => {
  res.render("home");

}
const HomePage =  async (req, res) => {
    try {
        const posts = await Post.find().select('userid title content upvote downvote noofreplies').lean(); // Fetch posts

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
        }).reverse();

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
        const user = await User.findById(useris).select('_id name');
        console.log(user);

        res.render('postpage',{post,user}); 
        console.log("Post send");

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error for PostPage' });
    }
}

const vote = async (req, res) => {
    const { vote } = req.body;
    console.log(vote);
    if(!vote){
       res.status(400).json({ error: 'Invalid Voting' });
    }
    const postidd = req.params._id;
    const useridd = req.user.id; 
    const entry = await PostVote.findOne({ 
      $and: [ { userid: useridd }, { postid: postidd } ]
    });
    console.log(entry);
    // console.log();
    let response = 0;
    try{
    if(entry){
      if (entry.vote == vote) {
        await PostVote.deleteOne({ _id: entry._id });
        response = 0;
        console.log("remove Upvote/Downvote");
      } else {
        await PostVote.updateOne({ _id: entry._id }, { $set: { vote: vote } });
        response = vote;
        console.log("update Upvote/Downvote");
      }
    }
    else{
      const newentry = await PostVote.create(
        {
            userid: useridd,
            postid: postidd,
            vote : vote
        }
      )
      console.log("added Upvote/Downvote");
      response = vote;
    }

    const filter1 = { postid: postidd, vote : 1 };
    const filter2 = { postid: postidd, vote : -1 };

    const upvotecount = await PostVote.countDocuments(filter1);
    const downvotecount = await PostVote.countDocuments(filter2);
    await Post.updateOne({ _id: postidd }, { $set: { upvote: upvotecount,  downvote: downvotecount } });

    res.json({ response : response , uc : upvotecount , dc : downvotecount });
    
  }catch(error){
    return res.status(400).json({ error: 'ERROR IN VOTING' });
  }
}
module.exports = {
  Home,
    HomePage,
    PostPage,
    vote
}