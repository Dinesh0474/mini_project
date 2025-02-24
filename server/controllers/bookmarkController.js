const pool = require('../models/db');

// Bookmark a tweet
exports.bookmarkTweet = async (req, res) => {
  const { userId, tweetId } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "Bookmark" (userId, tweetId) VALUES ($1, $2) RETURNING *',
      [userId, tweetId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all bookmarks for a user
exports.getBookmarksByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM "Bookmark" WHERE userId = $1', [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Remove a bookmark from a tweet
exports.removeBookmark = async (req, res) => {
  const { userId, tweetId } = req.params;

  try {
    const result = await pool.query(
      'DELETE FROM "Bookmark" WHERE userId = $1 AND tweetId = $2 RETURNING *',
      [userId, tweetId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Bookmark not found' });
    }
    res.status(200).json({ message: 'Bookmark removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


