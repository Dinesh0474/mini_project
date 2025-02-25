const pool = require('../models/db');

// Create a profile
exports.createProfile = async (req, res) => {
  const { username, fullName, email, passwordHash, age, profession } = req.body;

  try {
    // Check if username or email already exist in the database
    const existingUser = await pool.query(
      'SELECT 1 FROM "Profile" WHERE username = $1 OR email = $2 LIMIT 1',
      [username, email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ message: 'Username or Email already exists' });
    }

    // Insert new profile into the database
    const result = await pool.query(
      'INSERT INTO "Profile" (username, fullName, email, passwordHash, age, profession) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, fullName, email, passwordHash, age, profession]
    );

    // Return the newly created profile data
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Get all profiles
exports.getProfiles = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM "Profile"');
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// // Get profile by ID
// exports.getProfileById = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const result = await pool.query('SELECT * FROM "Profile" WHERE id = $1', [id]);
//     if (result.rows.length === 0) {
//       return res.status(404).json({ message: 'Profile not found' });
//     }
//     res.status(200).json(result.rows[0]);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// };

exports.getProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    // Query profile details
    const profileResult = await pool.query('SELECT id, username, fullName FROM "Profile" WHERE id = $1', [id]);
    if (profileResult.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
   
    const profile = profileResult.rows[0];
 
    // Get followers count
    const followersCountResult = await pool.query('SELECT COUNT(*) FROM "Follow" WHERE followingId = $1', [id]);
    const followersCount = parseInt(followersCountResult.rows[0].count);
 
    // Get following count
    const followingCountResult = await pool.query('SELECT COUNT(*) FROM "Follow" WHERE followerId = $1', [id]);
    const followingCount = parseInt(followingCountResult.rows[0].count);
 
    // Get posts count
    const postsCountResult = await pool.query('SELECT COUNT(*) FROM "Tweet" WHERE userId = $1', [id]);
    const postsCount = parseInt(postsCountResult.rows[0].count);
 
    // Get list of posts
    const postsResult = await pool.query('SELECT id, text, hashtags, imagePath FROM "Tweet" WHERE userId = $1', [id]);
    const posts = [];
 
    for (let post of postsResult.rows) {
      // Get likes count for each post
      const likesCountResult = await pool.query('SELECT COUNT(*) FROM "Like" WHERE tweetId = $1', [post.id]);
      const likesCount = parseInt(likesCountResult.rows[0].count);
     
      posts.push({
        id: post.id,
        text: post.text,
        hashtags: post.hashtags,
        image: post.imagepath,
        likesCount: likesCount
      });
    }
 
    // Respond with the data
    res.status(200).json({
      id: profile.id,
      name: profile.fullName,
      username: profile.username,
      followersCount: followersCount,
      followingCount: followingCount,
      postCount: postsCount,
      posts: posts
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getMainProfileById = async (req, res) => {
  const { id } = req.params;
  try {
    // Query profile details
    const profileResult = await pool.query('SELECT id, username, fullName FROM "Profile" WHERE id = $1', [id]);
    if (profileResult.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
   
    const profile = profileResult.rows[0];
 
    // Get followers count
    const followersCountResult = await pool.query('SELECT COUNT(*) FROM "Follow" WHERE followingId = $1', [id]);
    const followersCount = parseInt(followersCountResult.rows[0].count);
 
    // Get following count
    const followingCountResult = await pool.query('SELECT COUNT(*) FROM "Follow" WHERE followerId = $1', [id]);
    const followingCount = parseInt(followingCountResult.rows[0].count);
 
    // Get posts count
    const postsCountResult = await pool.query('SELECT COUNT(*) FROM "Tweet" WHERE userId = $1', [id]);
    const postsCount = parseInt(postsCountResult.rows[0].count);
 
    
    // Respond with the data
    res.status(200).json({
      id: profile.id,
      name: profile.fullName,
      username: profile.username,
      followersCount: followersCount,
      followingCount: followingCount,
      postCount: postsCount
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Search profiles based on query
exports.searchProfiles = async (req, res) => {
  const { q } = req.query;
  console.log(q);
 
 
  try {
    const result = await pool.query(
      'SELECT * FROM "Profile" WHERE username ILIKE $1 LIMIT 5',
      [`%${q}%`]
    );
   
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
 

// Update a profile
exports.updateProfile = async (req, res) => {
  const { id } = req.params;
  const { username, fullName, email, passwordHash, age, profession } = req.body;

  try {
    const result = await pool.query(
      'UPDATE "Profile" SET username = $1, fullName = $2, email = $3, passwordHash = $4, age = $5, profession = $6 WHERE id = $7 RETURNING *',
      [username, fullName, email, passwordHash, age, profession, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete a profile
exports.deleteProfile = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query('DELETE FROM "Profile" WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.status(200).json({ message: 'Profile deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
