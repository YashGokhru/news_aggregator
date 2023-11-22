const express = require("express");
const router = express.Router();
const{
    replytocomment,
    showreplies
} = require("../controllers/CommentController");
const validateToken = require("../middleware/validateToken");
const upload = require("../../utils/multer")


router.post('/replytocomment/:_id',validateToken, replytocomment);
router.get('/showreplies/:_id', validateToken, showreplies);

module.exports = router;