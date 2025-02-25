const pool = require('../models/db');
 
// Bookmark a tweet
exports.bookmarkTweet = async (req, res) => {
  const { userId, tweetId } = req.body;

  try {
    // Check if the tweet is already bookmarked by the user
    const checkBookmark = await pool.query(
      'SELECT * FROM "Bookmark" WHERE userId = $1 AND tweetId = $2',
      [userId, tweetId]
    );

    if (checkBookmark.rows.length > 0) {
      // If the tweet is already bookmarked, send a response indicating it's already saved
      return res.status(200).json({ message: 'This post is already bookmarked.' , isAlreadyBookmarked: true});
    }

    // If the tweet is not already bookmarked, insert it into the database
    const result = await pool.query(
      'INSERT INTO "Bookmark" (userId, tweetId) VALUES ($1, $2) RETURNING *',
      [userId, tweetId]
    );

    // Respond with the result of the insertion
    res.status(201).json({ message: 'Post bookmarked successfully!', bookmark: result.rows[0] ,isAlreadyBookmarked: false});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

 
// Get all bookmarks for a user
// exports.getBookmarksByUser = async (req, res) => {
//   const { userId } = req.params;
 
//   try {
//     const result = await pool.query('SELECT * FROM "Bookmark" WHERE userId = $1', [userId]);
//     res.status(200).json(result.rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };
 
// Remove a bookmark from a tweet
exports.removeBookmark = async (req, res) => {
  const { userId, tweetId } = req.params;
  console.log(userId,tweetId);
 
 
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
 
exports.getBookmarkedTweets = async (req, res) => {
  const { userId } = req.params; // Extract userId from URL parameters
 
  try {
    // Query to join Bookmark and Tweet tables to get tweet details
    const result = await pool.query(
      `
      SELECT t.id AS tweetId, t.text, t.imagePath AS image_url
      FROM "Bookmark" b
      JOIN "Tweet" t ON b.tweetId = t.id
      WHERE b.userId = $1
      `,
      [userId]
    );
 
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'No bookmarks found for this user.' });
    }
 
    // Send the bookmarked tweet data back as a response
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
 
 
 