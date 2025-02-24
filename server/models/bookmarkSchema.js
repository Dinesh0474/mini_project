const createBookmarkSchema = () => {
    return `
      CREATE TABLE IF NOT EXISTS "Bookmark" (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        userId UUID REFERENCES "Profile"(id) ON DELETE CASCADE,
        tweetId UUID REFERENCES "Tweet"(id) ON DELETE CASCADE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE (userId, tweetId)
      );
    `;
  }
  
  module.exports = createBookmarkSchema;
  