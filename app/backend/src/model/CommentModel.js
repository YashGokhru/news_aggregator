const mongoose = require("mongoose");
const User = require("./UserModel");
const Post = require("./PostModel");

const commentSchema = new mongoose.Schema({

    userid: {
        type: String,
        required : true
    },
    postid: {
        type: String,
        required : true
    },
    parentid :{           // Id of parent comment;
        type: String,
    },

    content: {
        type: String,
        required: true
    },

    noofreplies: {
        type: Number,
        default:0
    },
    upvote: {
        type: Number,
        default:0
    },
    
    downvote: {
        type: Number,
        default:0
    },


}, { timestamps: true })

const Comm = mongoose.model("comments", commentSchema);

module.exports = Comm;