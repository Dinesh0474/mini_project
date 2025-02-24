const createProfileSchema = () => {
    return `
      CREATE TABLE IF NOT EXISTS "Profile" (
        id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
        username VARCHAR(255) UNIQUE NOT NULL,
        fullName VARCHAR(255),
        age INT,
        profession VARCHAR(255),
        email VARCHAR(255) UNIQUE NOT NULL,
        passwordHash VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
  }
  
  module.exports = createProfileSchema;
  