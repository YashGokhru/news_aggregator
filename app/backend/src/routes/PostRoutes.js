const express = require("express");
const router = express.Router();
const{
    CreatePost,
    GetPost,
    DeletePost,
    PostComment,
    GetAllComments,
    GetComment
} = require("../controllers/PostController");
const validateToken = require("../middleware/validateToken");
const upload = require("../../utils/multer")


router.post("/createpost",validateToken,CreatePost);
// router.post("/CreatePost",validateToken,upload.single('file'),PostUpload);
router.get("/getpost/:_id",validateToken,GetPost);
router.delete("/deletePost/:_id", validateToken, DeletePost);
router.post("/CreateComment/:_id",validateToken,PostComment);
// router.post("/CreateComment",validateToken,upload.single('file'),PostComment);
router.get("/ShowComment/:_id",GetComment);
router.get('/comments/:_id',  GetAllComments);


module.exports = router;