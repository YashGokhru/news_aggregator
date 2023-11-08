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

    content: {
        type: String,
        required: true,
    },

    upvote: {
        type: Number,
    },

    downvote: {
        type: Number,
    },

    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }],


}, { timestamps: true })

const Post = mongoose.model("post", postSchema);

module.exports = Post;