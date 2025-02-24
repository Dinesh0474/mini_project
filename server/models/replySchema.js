const createReplySchema = () => {
    return `
      CREATE TABLE IF NOT EXISTS "Reply" (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        text TEXT NOT NULL,
        userId UUID REFERENCES "Profile"(id) ON DELETE CASCADE,
        tweetId UUID REFERENCES "Tweet"(id) ON DELETE CASCADE,
        replyId UUID REFERENCES "Reply"(id) ON DELETE CASCADE,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  }
  
  module.exports = createReplySchema;
   