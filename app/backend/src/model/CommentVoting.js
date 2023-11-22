const mongoose = require("mongoose");
const User = require("./UserModel");
const Comment = require("./CommentModel");

const CommentVoting = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User,
        
    },
    commentid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Comment,
    },
    vote : {                     // 1 for upvote, -1 for downvote;
        type : Number,
        required : true
    }
})

const CommentVote = mongoose.model("commentvoting", CommentVoting);
module.exports = CommentVote;