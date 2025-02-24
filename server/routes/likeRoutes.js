const express = require('express');
const likeController = require('../controllers/likeController');

const router = express.Router();

// CRUD operations for likes
router.post('/', likeController.likeTweet);
router.get('/:tweetId', likeController.getLikesByTweet);

module.exports = router;
