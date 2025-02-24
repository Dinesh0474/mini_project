const express = require('express');
const bookmarkController = require('../controllers/bookmarkController');

const router = express.Router();

// CRUD operations for bookmarks
router.post('/', bookmarkController.bookmarkTweet);
router.get('/:userId', bookmarkController.getBookmarksByUser);
router.delete('/:userId/:tweetId', bookmarkController.removeBookmark);

module.exports = router;
