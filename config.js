export const {
  HTTP_PORT = 5000,
  NODE_ENV = 'development',

  MONGO_USER = 'bbogdan2008',
  MONGO_PSWD = 'temporara123',
  MONGO_URI = 'ds161397.mlab.com:61397/lunch-break',

  JWT_KEY = 'secretkey20',

  SESSION_NAME = 'SessionID',
  SESSION_LIFETIME = 1000 * 60 * 60 * 24, // one day
  SESSION_SECRET = 'secretkey20'
} = process.env;
