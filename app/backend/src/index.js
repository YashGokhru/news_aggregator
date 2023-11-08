const express = require("express");
require('ejs');
require("../src/config/DbConnection");
const app = express();
const dotenv = require("dotenv").config();
const UserRoutes = require("./routes/UserRoutes");
const PostRoutes = require("./routes/PostRoutes");


app.use(express.json());
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.get("/", (req, res) => {
  res.send("Welcome to News Aggregator!");
});

app.use("/user",UserRoutes);
app.use("/post",PostRoutes);



app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT + "✅");
});
