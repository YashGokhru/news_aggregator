const mongoose = require("mongoose");
const Comments = require("./CommentModel");

const postSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true
    },
    
    title: {
        type: String,
        required: true
    },
    link: {
        type: String,
        trim: true, 
        
    },

    content: {
        type: String,
        required: true,
    },

    upvote: {
        type: Number,
        default:0
    },
    
    downvote: {       
        type: Number,
        default:0
    },

    replies: [{
        type : mongoose.Schema.Types.ObjectId,
        ref : Comments
    }],

    noofreplies: {         //no of replies
        type : Number,
        default : 0
    }


}, { timestamps: true })

const Post = mongoose.model("post", postSchema);

module.exports = Post;