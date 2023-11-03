const express = require("express");
require("../src/config/DbConnection");
const app = express();
const dotenv = require("dotenv").config();
const UserRoutes = require("./routes/UserRoutes");

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to News Aggregator!");
});

app.use("/SignUp",UserRoutes);

app.listen(process.env.PORT, () => {
  console.log("Server listening on port " + process.env.PORT + "✅");
});
