const mongoose = require("mongoose");


const postSchema = new mongoose.Schema({

    userid: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    imagePath: {
        type: String, // Assuming you store the image as a file path
        required: true,
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

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        // ref: 'Comment'
    }],


}, { timestamps: true })

const Post = mongoose.model("post", postSchema);

module.exports = Post;