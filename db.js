import mongoose from 'mongoose';

import User from './api/models/user';

// db connection
const dbUri =
  'mongodb://' +
  process.env.MONGOLAB_USER +
  ':' +
  process.env.MONGOLAB_PSWD +
  '@' +
  process.env.MONGOLAB_URL;

const dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectDb = () => {
  return mongoose.connect(dbUri, dbOptions);
};

const models = { User };

export { connectDb };
export default models;
