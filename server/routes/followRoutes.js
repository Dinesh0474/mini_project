const express = require('express');
const followController = require('../controllers/followController');
const router = express.Router();

// Follow a user
router.post('/', followController.followUser);

// Get all followers of a user
router.get('/followers/:followingId', followController.getFollowersByUser);

// Get all users a user is following
router.get('/following/:followerId', followController.getFollowingByUser);

// Unfollow a user
router.delete('/:followerId/:followingId', followController.unfollowUser);

module.exports = router;
