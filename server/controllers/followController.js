const pool = require('../models/db');

// Follow a user
exports.followUser = async (req, res) => {
    const { followerId, followingId } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO "Follow" (followerId, followingId) VALUES ($1, $2) RETURNING *',
            [followerId, followingId]
        );
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all followers for a user
exports.getFollowersByUser = async (req, res) => {
    const { followingId } = req.params;

    try {
        const result = await pool.query(
            'SELECT followerid FROM "Follow" WHERE followingId = $1',
            [followingId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Get all users a user is following
exports.getFollowingByUser = async (req, res) => {
    const { followerId } = req.params;

    try {
        const result = await pool.query(
            'SELECT followingid FROM "Follow" WHERE followerId = $1',
            [followerId]
        );
        res.status(200).json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
    const { followerId, followingId } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM "Follow" WHERE followerId = $1 AND followingId = $2 RETURNING *',
            [followerId, followingId]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'Follow not found' });
        }
        res.status(200).json({ message: 'Follow removed' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};
