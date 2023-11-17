const express = require("express");
const router = express.Router();
const {
    HomePage
} = require("../controllers/HomeController");
const validateToken = require("../middleware/validateToken");

//For Home
router.get("/", HomePage);

module.exports = router;