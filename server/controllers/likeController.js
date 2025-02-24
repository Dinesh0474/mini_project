const pool = require('../models/db');

// Like a tweet
exports.likeTweet = async (req, res) => {
  const { userId, tweetId } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "Like" (userId, tweetId) VALUES ($1, $2) RETURNING *',
      [userId, tweetId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all likes for a tweet
exports.getLikesByTweet = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM "Like" WHERE tweetId = $1', [tweetId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
