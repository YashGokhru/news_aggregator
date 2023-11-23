const express = require("express");
// require('ejs');
require("../src/config/DbConnection");
const app = express();
const dotenv = require("dotenv").config();
const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");
const HomeRoutes = require("./routes/HomeRoutes");
const SearchRoutes = require("./routes/SearchRoutes");
const CommentRoutes = require("./routes/CommentRoutes");
const cookieParser = require("cookie-parser");
const path = require('path');

app.set('view engine', 'ejs'); // To parse .ejs from view
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app.set('view engine', 'ejs');

// console.log(__dirname);
// console.log(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, '../public')));

app.get("/", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/postpage", (req, res) => {
  res.render("postpage");
});

app.get("/resetpassword", (req, res) => {
  res.render("resetpassword");
});

app.get("/forgotpassword", (req, res) => {
  res.render("ForgotPassword");
});
app.get("/postpage", (req, res) => {
  res.render("postpage");
});

app.get("/createpost", (req, res) => {
  res.render("CreatePost");
});

app.get("/search", (req, res) => {
  res.render("search");
});

const port = process.env.PORT || 3000
app.use("/user",UserRoutes);
app.use("/post",PostRoutes);
app.use("/posts",HomeRoutes);
app.use("/search",SearchRoutes);
app.use("/comments",CommentRoutes);
//process.env.PORT
app.listen(port, () => {
  console.log("Server listening on port " + port + "✅");
});
