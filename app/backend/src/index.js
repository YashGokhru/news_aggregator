const express = require("express");
// require('ejs');
require("../src/config/DbConnection");
const app = express();
const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");
const HomeRoutes = require("./routes/HomeRoutes");
const SearchRoutes = require("./routes/SearchRoutes");
const CommentRoutes = require("./routes/CommentRoutes");
const ProfileRoutes = require("./routes/ProfileRoutes");
const cookieParser = require("cookie-parser");
const path = require("path");

console.log({ path: path.resolve(__dirname, "../.env") });
const dotenv = require("dotenv").config({
  path: path.resolve(__dirname, "../.env"),
});

app.set("view engine", "ejs"); // To parse .ejs from view
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.set('view engine', 'ejs');

// console.log(__dirname);
// console.log(express.static(path.join(__dirname)));
app.use(express.static(path.join(__dirname, "../public")));

app.get( "/", asyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt;
    console.log("Token:", token);
    if (!token) {
      console.error("Token not found");
      res.redirect("login");
      res.status(400);
      throw new Error("Token not found");
    }
    res.render('home');
  })
);

app.get("/register", (req, res) => {
  res.render("register");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/forgotpassword", (req, res) => {
  res.render("ForgotPassword");
});

app.get("/createpost", asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  console.log("Token:", token);
  if (!token) {
    console.error("Token not found");
    res.redirect("login");
    res.status(400);
    throw new Error("Token not found");
  }
  res.render('CreatePost');
})
);

app.get("/search", asyncHandler(async (req, res, next) => {
  let token = req.cookies.jwt;
  console.log("Token:", token);
  if (!token) {
    console.error("Token not found");
    res.redirect("login");
    res.status(400);
    throw new Error("Token not found");
  }
  res.render('search');
})
);

const port = process.env.PORT || 147;
app.use("/user", UserRoutes);
app.use("/post", PostRoutes);
app.use("/home", HomeRoutes);
app.use("/search", SearchRoutes);
app.use("/comments", CommentRoutes);
app.use("/profile", ProfileRoutes);
//process.env.PORT
const server = app.listen(port, () => {
  console.log("Server listening on port " + port + "✅");
});

module.exports = app;
