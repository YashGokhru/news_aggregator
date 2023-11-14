const express = require("express");
const router = express.Router();
const{
    PostUpload,
    GetPost,
    DeletePost
} = require("../controllers/PostController");
const validateToken = require("../middleware/validateToken");
const upload = require("../../utils/multer")


router.post("/CreatePost",validateToken,upload.single('file'),PostUpload);
router.get("/getPost",validateToken,GetPost);
router.delete("/deletePost",validateToken,DeletePost);



module.exports = router;