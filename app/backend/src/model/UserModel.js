const mongoose = require("mongoose");
const Post = require("./PostModel");

const userSchema = new mongoose.Schema({
name:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
},

password:{
    type:String,
    required:true
},

posts: [
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  }],

}, {timestamps:true})

const User  = mongoose.model("user",userSchema);

module.exports = User;