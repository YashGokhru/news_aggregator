const express = require("express");
const router = express.Router();
const{PostUpload,GetPost} = require("../controllers/PostController");
const validateToken = require("../middleware/validateToken");
const upload = require("../../utils/multer")


router.post("/",validateToken,upload.single('file'),PostUpload);



module.exports = router;