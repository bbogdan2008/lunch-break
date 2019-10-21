import mongoose from 'mongoose';
import { MONGO_USER, MONGO_PSWD, MONGO_URI } from './config';
import User from './api/models/user';

// db connection
const dbUri = 'mongodb://' + MONGO_USER + ':' + MONGO_PSWD + '@' + MONGO_URI;

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
