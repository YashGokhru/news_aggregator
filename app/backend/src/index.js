const express = require("express");
// require('ejs');
require("../src/config/DbConnection");
const app = express();
const dotenv = require("dotenv").config();
const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");
const HomeRoutes = require("./routes/HomeRoutes");
const SearchRoutes = require("./routes/SearchRoutes");
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

const port = process.env.PORT || 3000
app.use("/user",UserRoutes);
app.use("/post",PostRoutes);
app.use("/posts",HomeRoutes);
app.use("/search",SearchRoutes);
//process.env.PORT
app.listen(port, () => {
  console.log("Server listening on port " + port + "✅");
});
