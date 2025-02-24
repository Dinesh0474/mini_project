const pool = require('../models/db');

// Create a reply
exports.createReply = async (req, res) => {
  const { userId, tweetId, text, replyId } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "Reply" (userId, tweetId, text, replyId) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, tweetId, text, replyId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all replies for a tweet
exports.getRepliesByTweet = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM "Reply" WHERE tweetId = $1', [tweetId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a reply
exports.updateReply = async (req, res) => {
  const { replyId } = req.params;
  const { text } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "Reply" SET text = $1 WHERE id = $2 RETURNING *',
      [text, replyId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a reply
exports.deleteReply = async (req, res) => {
  const { replyId } = req.params;

  try {
    const result = await pool.query('DELETE FROM "Reply" WHERE id = $1 RETURNING *', [replyId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Reply not found' });
    }
    res.status(200).json({ message: 'Reply deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
