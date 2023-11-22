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
    if (!commid) {
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
    res.status(200).json({ message: "Comment Added Succesfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const showreplies = async (req, res) => {
  try {
    const commid = req.params._id;
    if (!commid) {
      res.status(400).json({ error: "Comment id not found" });
      return;
    }
    const comments = await Comment.find({ parentid: commid }).lean();
    if (!comments) {
      res.status(400).json({ error: "Comment not found" });
      return;
    }
    console.log(comments);
    res.json({ comments });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const vote = async (req, res) => {
    const { vote } = req.body;

    if(!vote){
       res.status(400).json({ error: 'Invalid Voting' });
    }
    const commidd = req.params._id;
    const useridd = req.user.id; 
    const entry = CommentVote.findOne({ 
      $and: [ { userid: useridd }, { commid: commidd } ]
    });

    let response = 0;
    try{
    if(entry){
      if (entry.vote == vote) {
        await Comment.deleteOne({ _id: entry._id });
        response = 0;
      } else {
        await Comment.updateOne({ _id: entry._id }, { $set: { vote: entry.vote } });
        response = vote;
      }
    }
    else{
      const newentry = await CommentVote.create(
        {
            userid: useridd,
            commid: commidd,
            vote : vote
        }
      )
      response = vote;
    }

    const filter1 = { commid: commidd, vote : 1 };
    const filter2 = { commid: commidd, vote : -1 };

    const upvotecount = await collection.countDocuments(filter1);
    const downvotecount = await collection.countDocuments(filter2);
    
    res.json({ response : response , uc : upvotecount , dc : downvotecount });
    
  }catch(error){
    return res.status(400).json({ error: 'ERROR IN VOTING' });
  }
}

module.exports = {
  replytocomment,
  showreplies,
  vote,
};
