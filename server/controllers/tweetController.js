const pool = require('../models/db');

// Create a tweet
exports.createTweet = async (req, res) => {
  const { userId, text, hashtags, imagePath } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO "Tweet" (userId, text, hashtags, imagePath) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, text, hashtags, imagePath]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get tweets by user ID
exports.getTweets = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query('SELECT * FROM "Tweet" WHERE userId = $1', [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update a tweet
exports.updateTweet = async (req, res) => {
  const { tweetId } = req.params;
  const { text, hashtags, imagePath } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "Tweet" SET text = $1, hashtags = $2, imagePath = $3 WHERE id = $4 RETURNING *',
      [text, hashtags, imagePath, tweetId]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a tweet
exports.deleteTweet = async (req, res) => {
  const { tweetId } = req.params;

  try {
    const result = await pool.query('DELETE FROM "Tweet" WHERE id = $1 RETURNING *', [tweetId]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Tweet not found' });
    }
    res.status(200).json({ message: 'Tweet deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get tweet details with likes count
// In your tweetController.js

// exports.getTweetDetail = async (req, res) => {
//   const tweetId = req.params.tweetId; // Access tweetId from URL parameter

//   // Validate if tweetId is a valid UUID (basic check)
//   if (!isValidUUID(tweetId)) {
//     return res.status(400).json({ error: 'Invalid tweetId format' });
//   }

//   try {
//     const query = `
//       SELECT 
//         t.id AS tweetId, 
//         t.text AS tweetText, 
//         t.createdAt AS tweetCreatedAt,

//         -- Count the number of likes for the tweet
//         COUNT(l.id) AS likeCount
//       FROM "Tweet" t
//       LEFT JOIN "Like" l ON t.id = l.tweetId
//       WHERE t.id = $1::uuid
//       GROUP BY t.id;
//     `;

//     const result = await pool.query(query, [tweetId]);

//     if (result.rows.length === 0) {
//       return res.status(404).json({ error: 'Tweet not found or no likes for this tweet' });
//     }

//     const tweet = result.rows[0];
//     console.log(tweet);

//     // Construct the final response with like count
//     const response = {
//       tweet: {
//         id: tweet.tweetid,
//         text: tweet.tweettext,
//         createdAt: tweet.tweetcreatedat
//       },
//       likeCount: tweet.likecount // The count of likes for the tweet
//     };
    
//     res.status(200).json(response);

//   } catch (err) {
//     console.error('Error fetching tweet like details:', err);
//     res.status(500).json({ error: 'Failed to fetch tweet like details' });
//   }
// };



exports.getTweetDetail = async (req, res) => {
  const tweetId = req.params.tweetId; // Access tweetId from URL parameter

  // Validate if tweetId is a valid UUID (basic check)
  if (!isValidUUID(tweetId)) {
    return res.status(400).json({ error: 'Invalid tweetId format' });
  }

  try {
    const query = `
      SELECT 
        t.id AS tweetId, 
        t.text AS tweetText, 
        t.createdAt AS tweetCreatedAt,
        
        -- Count the number of likes for the tweet
        COUNT(l.id) AS likeCount,

        -- Fetching reply details for the tweet
        r.id AS replyId,
        r.text AS replyText,
        r.createdAt AS replyCreatedAt,
        r.userId AS replyUserId,
        p.username AS replyUserName

      FROM "Tweet" t
      LEFT JOIN "Like" l ON t.id = l.tweetId
      LEFT JOIN "Reply" r ON t.id = r.tweetId
      LEFT JOIN "Profile" p ON r.userId = p.id
      WHERE t.id = $1::uuid
      GROUP BY t.id, r.id, p.id;
    `;

    const result = await pool.query(query, [tweetId]);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Tweet not found or no replies or likes for this tweet' });
    }

    // Separate tweet and replies data
    const tweet = result.rows[0];
    const replies = result.rows.map(row => ({
      replyId: row.replyId,
      replyText: row.replyText,
      replyCreatedAt: row.replyCreatedAt,
      replyUserId: row.replyUserId,
      replyUserName: row.replyUserName
    }));

    // Construct the final response with tweet details, like count, and replies
    const response = {
      tweet: {
        id: tweet.tweetid,
        text: tweet.tweettext,
        createdAt: tweet.tweetcreatedat
      },
      likeCount: tweet.likecount, // The count of likes for the tweet
      replies: replies // List of replies linked to the tweet
    };

    res.status(200).json(response);

  } catch (err) {
    console.error('Error fetching tweet details:', err);
    res.status(500).json({ error: 'Failed to fetch tweet details' });
  }
};


// Helper function to validate UUID format
function isValidUUID(uuid) {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  return uuidRegex.test(uuid);
}
