import {
  SESSION_NAME,
  SESSION_SECRET,
  SESSION_LIFETIME,
  NODE_ENV
} from './config';

import session from 'express-session';
import mongoose from 'mongoose';
import connectMongo from 'connect-mongo';

const MongoStore = connectMongo(session);
const sessionConfig = {
  name: SESSION_NAME,
  secret: SESSION_SECRET, // TODO review
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'sessions',
    ttl: parseInt(SESSION_LIFETIME) / 1000
  }),
  cookie: {
    sameSite: true,
    secure: NODE_ENV === 'production',
    maxAge: parseInt(SESSION_LIFETIME)
  },
  resave: false,
  saveUninitialized: false
};

export default sessionConfig;
