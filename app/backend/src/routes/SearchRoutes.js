const express = require("express");
const router = express.Router();
const{
    SearchByKeyword,
    SearchByUsername
} = require("../controllers/SearchController");
const validateToken = require("../middleware/validateToken");

router.get("/searchpost/:keyword",validateToken,SearchByKeyword);
router.get("/searchuser/:username",validateToken,SearchByUsername);

module.exports = router;