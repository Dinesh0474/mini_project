const express = require('express');
const replyController = require('../controllers/replyController');

const router = express.Router();

// CRUD operations for replies
router.post('/', replyController.createReply);
router.get('/:tweetId', replyController.getRepliesByTweet);
router.put('/:replyId', replyController.updateReply);
router.delete('/:replyId', replyController.deleteReply);

module.exports = router;
