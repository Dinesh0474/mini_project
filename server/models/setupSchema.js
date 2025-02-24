// const pool = require('./db');
// const dotenv = require('dotenv');
// const createProfileSchema = require('./profileSchema');
// const createTweetSchema = require('./tweetSchema');
// const createReplySchema = require('./replySchema');
// const createLikeSchema = require('./likeSchema');
// const createBookmarkSchema = require('./bookmarkSchema');
// const createFollowSchema = require('./followSchema');
// const setupSchema = async () => {
//   const queries = [
//     createProfileSchema(),
//     createTweetSchema(),
//     createReplySchema(),
//     createLikeSchema(),
//     createBookmarkSchema(),
//     createFollowSchema()
//   ];
//   dotenv.config();

//   try {
//     for (const query of queries) {
//       await pool.query(query);
//     }
//     console.log('Database schema setup complete');
//   } catch (err) {
//     console.error('Error setting up schema:', err);
//   }
// };

// module.exports = setupSchema;
  

const pool = require('./db');
const dotenv = require('dotenv');
const createProfileSchema = require('./profileSchema');
const createTweetSchema = require('./tweetSchema');
const createReplySchema = require('./replySchema');
const createLikeSchema = require('./likeSchema');
const createBookmarkSchema = require('./bookmarkSchema');
const createFollowSchema = require('./followSchema');

const setupSchema = async () => {
  const queries = [
    'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";', // Enable the uuid-ossp extension
    createProfileSchema(),
    createTweetSchema(),
    createReplySchema(),
    createLikeSchema(),
    createBookmarkSchema(),
    createFollowSchema()
  ];

  dotenv.config();

  try {
    for (const query of queries) {
      await pool.query(query);
    }
    console.log('Database schema setup complete');
  } catch (err) {
    console.error('Error setting up schema:', err);
  }
};

module.exports = setupSchema;
