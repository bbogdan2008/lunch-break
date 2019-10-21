import http from 'http';
import { HTTP_PORT } from './config';
import { connectDb } from './db';
import app from './app';

const server = http.createServer(app);

const httpPort = HTTP_PORT || 3001;

connectDb().then(
  async () => {
    console.log(`MongoDB connected ...`);
    server.listen(httpPort, () =>
      console.log(`Server listening on port ${httpPort} ...`)
    );
  },
  err => {
    console.log(`MongoDB connection ERROR! Details: ${err} `);
  }
);
