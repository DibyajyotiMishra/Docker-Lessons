module.exports = {
  MONGODB_IP: process.env.MONGODB_IP || "mongodb",
  MONGODB_PORT: process.env.MONGODB_PORT || 27017,
  MONGODB_USER: process.env.MONGODB_USER,
  MONGODB_PASSWORD: process.env.MONGODB_PASSWORD,
  REDIS_URL: process.env.REDIS_URL || "redis",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  SESSION_SECRET: process.env.SESSION_SECRET,
};
