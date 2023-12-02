const User = require("../model/UserModel");
const Post = require("../model/PostModel");
const Comment = require("../model/CommentModel");
const CommentVote = require("../model/CommentVoting");

const asyncHandler = require("express-async-handler");
const path = require("path");
const mongoose = require("mongoose");

const replytocomment = async (req, res) => {
  const { comment } = req.body;

  if (!comment) {
    res.status(400).json({ error: "All fields are mandatory" });
    return;
  }
  try {
    const commid = req.params._id;
    if (!commid.length) {
      res.status(400).json({ error: "Comment id not found" });
      return;
    }
    const postiddd = await Comment.findById(commid).select("postid").lean();
    const postidd = postiddd.postid.toString();
    if (!postidd) {
      res.status(400).json({ error: "Comment not found" });
      return;
    }
    console.log(postidd);
    const newComment = {
      userid: req.user.id,
      postid: postidd,
      parentid: commid,
      content: comment,
      noofreplies: 0,
      upvote: 0,
      downvote: 0,
    };

    const createdComment = await Comment.create(newComment);
    const createdCommentId = createdComment._id; // Accessing the ID of the created comment
    console.log("New comment created:", createdComment.content);
    console.log("New comment ID:", createdCommentId); // Logging the ID

    await Post.updateOne({ _id: postidd }, { $inc: { noofreplies: 1 } });
    await Comment.updateOne({ _id: commid }, { $inc: { noofreplies: 1 } });
    const user = await User.findById(req.user.id).select('name').lean();
    res.status(200).json({ message: "Comment Added Succesfully", content : comment, username :  user.name });
    // res.status(200).json({ message: "Comment Added Succesfully", content : comment, username :  user.name, _id :createdComment._id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const showreplies = async (req, res) => {
  try {
    const commid = req.params._id;
    if (!commid.length) {
      res.status(400).json({ error: "Comment id not found" });
      return;
    }
    const comments = await Comment.find({ parentid: commid }).lean();
    if (!comments.length) {
      res.status(400).json({ error: "Comment not found" });
      return;
    }
    console.log(comments);
   return  res.status(200).send({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};



const vote = async (req, res) => {
    const { vote } = req.body;

    if(!vote){
      return  res.status(400).send({ error: 'Invalid Voting' });
    }
    const commidd = req.params._id;
    const useridd = req.user.id; 
    const entry = await CommentVote.findOne({ 
      $and: [ { userid: useridd }, { commentid: commidd } ]
    });
    console.log(entry);
    // console.log();
    let response = 0;
    try{
    if(entry){
      if (entry.vote == vote) {
        await CommentVote.deleteOne({ _id: entry._id });
        response = 0;
        console.log("remove Upvote/Downvote");
      } else {
        await CommentVote.updateOne({ _id: entry._id }, { $set: { vote: vote } });
        response = vote;
        console.log("update Upvote/Downvote");
      }
    }
    else{
      const newentry = await CommentVote.create(
        {
            userid: useridd,
            commentid: commidd,
            vote : vote
        }
      )
      console.log("added Upvote/Downvote");
      response = vote;
    }

    const filter1 = { commentid: commidd, vote : 1 };
    const filter2 = { commentid: commidd, vote : -1 };
    
    const upvotecount = await CommentVote.countDocuments(filter1);
    const downvotecount = await CommentVote.countDocuments(filter2);
    
    await Comment.updateOne({ _id: commidd }, { $set: { upvote: upvotecount,  downvote: downvotecount } });

   return  res.status(200).send({ response : response , uc : upvotecount , dc : downvotecount });
    
  }catch(error){
    return res.status(400).send({ error: 'ERROR IN VOTING' });
  }
}

module.exports = {
  replytocomment,
  showreplies,
  vote
};
