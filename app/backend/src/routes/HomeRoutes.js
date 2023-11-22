const express = require("express");
const router = express.Router();
const {
    HomePage,
    PostPage
} = require("../controllers/HomeController");
const validateToken = require("../middleware/validateToken");

//For Home
router.get("/", HomePage);
router.get("/:_id", PostPage);
module.exports = router;