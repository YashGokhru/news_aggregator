const express = require("express");
const router = express.Router();
const {
    Home,
    HomePage,
    PostPage,
    vote
} = require("../controllers/HomeController");
const validateToken = require("../middleware/validateToken");

//For Home
router.get("/", validateToken, Home);
router.get("/posts/", validateToken, HomePage);
router.get("/posts/:_id",validateToken,PostPage);
router.post("/post/vote/:_id",validateToken, vote);
module.exports = router;