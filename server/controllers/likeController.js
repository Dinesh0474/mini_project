const pool = require('../models/db');

// Like a tweet
exports.likeTweet = async (req, res) => {
  const userId = req.body.userId;
  const tweetId = req.body.tweetId;

  console.log("userId", userId);
  console.log("tweetId", tweetId);

  try {
    // Check if the user has already liked the tweet
    const checkResult = await pool.query(
      'SELECT * FROM "Like" WHERE userId = $1 AND tweetId = $2',
      [userId, tweetId]
    );

    
    if (checkResult.rows.length > 0) {
      // Remove the like (delete the record)
      await pool.query(
        'DELETE FROM "Like" WHERE userId = $1 AND tweetId = $2',
        [userId, tweetId]
      );
      return res.status(200).json({ message: 'Like removed (disliked)' });
    } else {
    
      const result = await pool.query(
        'INSERT INTO "Like" (userId, tweetId) VALUES ($1, $2) RETURNING *',
        [userId, tweetId]
      );
      return res.status(201).json(result.rows[0]);
    }
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
