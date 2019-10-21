import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);
const sessionConfig = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET, // TODO review
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions',
    ttl: parseInt(process.env.SESSION_LIFETIME) / 1000
  }),
  cookie: {
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: parseInt(process.env.SESSION_LIFETIME)
  },
  resave: false,
  saveUninitialized: false
};

export default sessionConfig;
