import http from 'http';
import { connectDb } from './db';
import app from './app';

const server = http.createServer(app);

const port = process.env.PORT || 3001;

connectDb().then(
  async () => {
    console.log(`MongoDB default connection open.`);
    server.listen(port, () =>
      console.log(`Server listening on port ${port} ...`)
    );
  },
  err => {
    console.log(`MongoDB connection ERROR! Details: ${err} `);
  }
);
