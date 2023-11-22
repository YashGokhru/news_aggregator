const mongoose = require("mongoose");
const User = require("./UserModel");
const Post = require("./PostModel");

const PostVoting = new mongoose.Schema({
    userid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : User
    },
    postid : {
        type : mongoose.Schema.Types.ObjectId,
        ref : Post
    },
    vote : {                     // 1 for upvote, -1 for downvote, 0 for neutral;
        type : Number,
        required : true
    }
})

const PostVote = mongoose.model("postvoting", PostVoting);

module.exports = PostVote;