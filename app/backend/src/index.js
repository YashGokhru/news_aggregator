const express = require("express");
// require('ejs');
require("../src/config/DbConnection");
const app = express();
const dotenv = require("dotenv").config();
const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");
const HomeRoutes = require("./routes/HomeRoutes");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}))
// app.set('view engine', 'ejs');


app.get("/", (req, res) => {
  res.send("Login");
});

const port = process.env.PORT || 3000
app.use("/user",UserRoutes);
app.use("/post",PostRoutes);
app.use("/home",HomeRoutes);

//process.env.PORT
app.listen(port, () => {
  console.log("Server listening on port " + port + "✅");
});
