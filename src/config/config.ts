const Config: { [key: string]: any } = {
  mongo: {
    uri: process.env.MONGO_URI || 'mongodb://127.0.0.1:27017?authSource=admin',
  },
  app: {
    host: process.env.APP_HOST || '0.0.0.0',
    port: process.env.APP_PORT || 3000,
  },
  jwt: {
    secret:
      process.env.JWT_SECRET ||
      'DAqWG8AXs5ud70mLfYID1DeLkSGWw9Kq9MHk5f813R4Q586bwJLCYPPOYtEfXvwyyx92f',
    algorithm: 'HS256',
    expiresIn: '1h',
  },
};

export default Config;
