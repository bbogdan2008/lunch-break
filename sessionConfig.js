import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);
const sessionConfig = {
  name: process.env.SESSION_NAME,
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions',
    ttl: parseInt(process.env.SESSION_LIFETIME_HOURS) * 60 * 60 // time period in seconds
    //touchAfter: 24 * 3600 // time period in seconds
  }),
  cookie: {
    sameSite: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: parseInt(process.env.SESSION_LIFETIME_HOURS) * 60 * 60 * 1000 // time period in milliseconds
  },
  resave: false,
  saveUninitialized: false
};

export default sessionConfig;
