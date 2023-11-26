const express = require("express");
const router = express.Router();
const{
    Profile
} = require("../controllers/Profile");
const validateToken = require("../middleware/validateToken");
const upload = require("../../utils/multer")

router.get("/",validateToken,Profile);

module.exports = router;