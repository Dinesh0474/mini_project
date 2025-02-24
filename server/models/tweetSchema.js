const createTweetSchema = () => {
    return `
      CREATE TABLE IF NOT EXISTS "Tweet" (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        text TEXT NOT NULL,
        userId UUID REFERENCES "Profile"(id) ON DELETE CASCADE,
        hashtags TEXT[] DEFAULT ARRAY[]::TEXT[],
        imagePath TEXT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  }
  
  module.exports = createTweetSchema;
  