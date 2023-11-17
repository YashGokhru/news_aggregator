const express = require("express");
const router = express.Router();
const{
    CreatePost,
    GetPost,
    DeletePost,
    PostComment,
    GetComment,
    SearchByKeyword,
    SearchByUserName
} = require("../controllers/PostController");
const validateToken = require("../middleware/validateToken");
const upload = require("../../utils/multer")


router.post("/CreatePost",validateToken,CreatePost);
// router.post("/CreatePost",validateToken,upload.single('file'),PostUpload);
router.get("/getPost",validateToken,GetPost);
router.delete("/deletePost/:_id", validateToken, DeletePost);
router.post("/CreateComment/:_id",validateToken,PostComment);
// router.post("/CreateComment",validateToken,upload.single('file'),PostComment);
router.get("/ShowComment/:_id",validateToken,GetComment);
router.post("/SearchByKewyword",validateToken,SearchByKeyword);
router.post("/SearchByUserName",validateToken,SearchByUserName);


module.exports = router;