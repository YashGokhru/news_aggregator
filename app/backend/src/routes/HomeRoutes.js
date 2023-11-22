const express = require("express");
const router = express.Router();
const {
    HomePage,
    PostPage,
    vote
} = require("../controllers/HomeController");
const validateToken = require("../middleware/validateToken");

//For Home
router.get("/", HomePage);
router.get("/:_id", PostPage);
router.get("/post/vote/:_id",validateToken, vote);
module.exports = router;