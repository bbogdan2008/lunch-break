import mongoose from 'mongoose';
import User from './api/models/user';

// db connection
const dbUri =
  'mongodb://' +
  process.env.MONGO_USER +
  ':' +
  process.env.MONGO_PASSWORD +
  '@' +
  process.env.MONGO_URI;

const dbOptions = {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

const connectDb = () => {
  return mongoose.connect(dbUri, dbOptions);
};
mongoose.Promise = global.Promise;

const models = { User };

export { connectDb };
export default models;
