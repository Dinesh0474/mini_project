const createfollowSchema = () => {
    return `
        CREATE TABLE IF NOT EXISTS "Follow" (
            id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
            followerId UUID REFERENCES "Profile"(id) ON DELETE CASCADE, 
            followingId UUID REFERENCES "Profile"(id) ON DELETE CASCADE, 
            createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE (followerId, followingId)
        );
    `;
}
module.exports = createfollowSchema;