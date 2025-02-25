const express = require('express');
const tweetController = require('../controllers/tweetController');

const router = express.Router();

// CRUD operations for tweets
router.post('/', tweetController.createTweet);
router.get("/info", tweetController.getAllTweetsWithReplies);
router.get('/:userId', tweetController.getTweetsbyId);
router.get('/', tweetController.getTweets);
router.put('/:tweetId', tweetController.updateTweet);
router.delete('/:tweetId', tweetController.deleteTweet);


module.exports = router;
