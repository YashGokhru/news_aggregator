const express = require("express");
const router = express.Router();

const{PostUpload} = require("../controllers/PostController");
const validateToken = require("../middleware/validateToken");

router.get("/",validateToken,PostUpload);






module.exports = router;