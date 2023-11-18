const express = require("express");
const router = express.Router();
const{
    SearchByKeyword,
    SearchByUsername
} = require("../controllers/SearchController");
const validateToken = require("../middleware/validateToken");

router.get("/SearchByKeyword/:keyword",validateToken,SearchByKeyword);
router.get("/SearchByUsername/:username",validateToken,SearchByUsername);

module.exports = router;