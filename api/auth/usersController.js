import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import HttpStatus from 'http-status-codes';

import validateRegisterInput from './validateRegisterForm';
import validateLoginInput from './validateLoginForm';

import models from '../../db';

exports.users_register = (req, res, next) => {
  // Validate user input
  const { errors, isValid } = validateRegisterInput(req.body);
  if (!isValid) {
    console.log('Not valid');
    return res.status(400).json(errors);
  }

  models.User.find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length > 0) {
        return res.status(400).json({
          message: 'Email already exists'
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new models.User({
              _id: mongoose.Types.ObjectId(),
              email: req.body.email,
              password: hash
            });
            user
              .save()
              .then(result => {
                res.status(201).json({
                  message: 'User created'
                });
              })
              .catch(err => {
                res.status(500).json({
                  error: err
                });
              });
          }
        });
      }
    });
};

exports.users_login = async (request, response) => {
  const { email, password } = request.body;

  const { errors, isValid } = validateLoginInput(email, password);
  if (!isValid) {
    return response.status(HttpStatus.BAD_REQUEST).json({
      success: false,
      message: 'Validation failed',
      errors
    });
  }

  try {
    const user = await models.User.findOne({ email }).exec();

    if (!user) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        success: false,
        message: 'Auth failed'
      });
    }
    const match = await bcrypt.compare(password, user.password);
    if (match) {
      request.session.user = {
        email: user.email,
        name: user.name
      };

      return response.status(HttpStatus.OK).json({
        success: true,
        message: 'Login successful',
        user: request.session.user
      });
    }

    return response.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Auth failed'
    });
  } catch (err) {
    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: '',
      errors: [{ error: err }]
    });
  }
};

exports.users_logout = (request, response) => {
  try {
    const user = request.session.user;
    if (user) {
      request.session.destroy(err => {
        if (err) throw err;
        response.clearCookie(process.env.SESSION_NAME);
        response.status(HttpStatus.OK).json({
          success: true,
          message: 'Logout successful'
        });
      });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (err) {
    response.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
      success: false,
      message: 'Logout failed',
      errors: [{ error: err }]
    });
  }
};

exports.users_delete_user = (req, res, next) => {
  models.User.remove({ _id: req.params.userId })
    .exec()
    .then(result => {
      res.status(200).json({
        message: 'User deleted'
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
