import path from 'path';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import HttpStatus from 'http-status-codes';

import session from 'express-session';
import sessionConfig from './sessionConfig';

import userRoutes from './api/auth/usersRoutes';
import placesRoutes from './api/places/placesRoutes';

var app = express();

app.use(session(sessionConfig));

app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/build')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/places', placesRoutes);

// not found URI
app.get((request, response, next) => {
  let error = new Error('Not Found');
  error.statusCode = HttpStatus.NOT_FOUND;
  next(error);
});

// global error handler
app.use((error, request, response, next) => {
  console.log(error);

  if (!error.statusCode) {
    error.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
  }
  response.status(error.statusCode);
  response.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
