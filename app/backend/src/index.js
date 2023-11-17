const express = require("express");
require("../src/config/DbConnection");
const app = express();
const dotenv = require("dotenv").config();
const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");
const cookieParser = require("cookie-parser");

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:false}))


app.get("/", (req, res) => {
  res.send("Login");
});


app.use("/user",UserRoutes);
app.use("/post",PostRoutes);



app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT + "✅");
});
