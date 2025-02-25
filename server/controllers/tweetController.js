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
exports.getTweetsbyId = async (req, res) => {
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



exports.getTweets = async (req, res) => {
  try {
    const query = `
      SELECT 
        t.id AS tweet_id,
        t.text AS tweet_text,
        t.createdAt AS tweet_created_at,
        t.hashtags,
        t.imagePath,
        p.id AS user_id,
        p.username,
        COUNT(l.id) AS like_count,
        ARRAY_AGG(l.userId) AS liked_by_users
      FROM "Tweet" t
      JOIN "Profile" p ON t.userId = p.id
      LEFT JOIN "Like" l ON t.id = l.tweetId
      GROUP BY t.id, p.id
      ORDER BY t.createdAt DESC;
    `;
    
    const result = await pool.query(query);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
}

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





exports.getAllTweetsWithReplies = async (req, res) => {
  try {
    const query = `
      SELECT 
        t.id AS tweetId, 
        t.text AS tweetText, 
        t.createdAt AS tweetCreatedAt,
        t.userId AS tweetUserId,  -- tweet's user ID
        
        -- Get the username of the tweet's author by joining Profile table
        p.username AS tweetUserName,  -- tweet's username
        
        t.imagePath AS tweetImage,  -- Include image stored in the database
        
        -- Count the number of likes for the tweet
        (SELECT COUNT(*) FROM "Like" WHERE tweetId = t.id) AS likeCount,

        -- Reply details (user info included)
        r.id AS replyId,
        r.text AS replyText,
        r.createdAt AS replyCreatedAt,
        r.userId AS replyUserId,
        rp.username AS replyUserName

      FROM "Tweet" t
      LEFT JOIN "Reply" r ON t.id = r.tweetId
      LEFT JOIN "Profile" p ON t.userId = p.id  -- Join to get the tweet's user's username
      LEFT JOIN "Profile" rp ON r.userId = rp.id  -- Join to get the reply's user's username
      ORDER BY t.createdAt DESC;  -- Order tweets by creation date
    `;

    const result = await pool.query(query);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'No tweets found' });
    }

    // Organizing tweets and their replies
    const tweets = result.rows.reduce((acc, row) => {
      // Create tweet entry if it doesn't exist
      if (!acc[row.tweetid]) {
        acc[row.tweetid] = {
          tweetId: row.tweetid,
          text: row.tweettext,
          createdAt: row.tweetcreatedat,
          imagePath: row.tweetimage,
          tweetUserId: row.tweetuserid,  // Include tweet's user ID
          tweetUserName: row.tweetusername,  // Include tweet's username
          likeCount: row.likecount,
          replies: []  // Initialize an empty array for replies
        };
      }

      // Add reply to the tweet if a reply exists
      if (row.replyid) {
        acc[row.tweetid].replies.push({
          replyId: row.replyid,
          replyText: row.replytext,
          replyCreatedAt: row.replycreatedat,
          replyUserId: row.replyuserid,
          replyUserName: row.replyusername
        });
      }

      return acc;
    }, {});

    // Convert tweets object into an array
    const tweetList = Object.values(tweets);

    // Construct the final response with all tweets and replies
    res.status(200).json({ tweets: tweetList });

  } catch (err) {
    console.error('Error fetching tweet details:', err);
    res.status(500).json({ error: 'Failed to fetch tweet details' });
  }
};

// Helper function to validate UUID format (if needed for future use)



// the above api response example

// {
//   "tweet": {
//     "id": "fb4718f6-c42d-48e4-a2e7-94d27daea186", dinesh tweet
//     "text": "hello all",
//     "createdAt": "2025-02-25T05:00:24.412Z",
//     "likeCount": "2"  2 like because one is liked by dinesh and other is liked by dastagir
//   },
//   "replies": [
//     {
//       "replyId": "03e82d37-922b-4f35-b31a-1efd15dba53b",
//       "replyText": "this is good tweet",
//       "replyCreatedAt": "2025-02-25T06:16:40.427Z",
//       "replyUserId": "22175d33-a7cc-467c-b3a8-1db69eb87bf2",  replied by dastagir
//       "replyUserName": "dastagir"
//     }
//   ]
// }