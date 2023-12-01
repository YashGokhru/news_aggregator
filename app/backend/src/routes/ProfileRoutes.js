const express = require("express");
const router = express.Router();
const{
    myProfile,
    Profile
} = require("../controllers/Profile");
const validateToken = require("../middleware/validateToken");
const upload = require("../../utils/multer")

router.get("/",validateToken,myProfile);
router.get("/:_id",validateToken,Profile);

module.exports = router;