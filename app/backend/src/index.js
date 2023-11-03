import express from "express";
const app = express();


app.get("/", (req, res) => {
  res.send("Welcome to News Aggregator!");
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT + "!");
});
