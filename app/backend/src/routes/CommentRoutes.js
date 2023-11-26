const express = require("express");
const router = express.Router();
const{
    replytocomment,
    showreplies,
    vote
} = require("../controllers/CommentController");
const validateToken = require("../middleware/validateToken");
const upload = require("../../utils/multer")


router.post('/replytocomment/:_id',validateToken, replytocomment);
router.get('/showreplies/:_id', validateToken, showreplies);
router.post('/vote/:_id', validateToken, vote);

module.exports = router;