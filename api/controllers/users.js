import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import HttpStatus from 'http-status-codes';

import validateRegisterInput from '../validation/register';
import validateLoginInput from '../validation/login';

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
  const { errors, isValid } = validateLoginInput(request.body);
  if (!isValid) {
    return response.status(HttpStatus.BAD_REQUEST).json(errors);
  }

  try {
    let users = await models.User.find({ email: request.body.email })
      .select('_id email name password')
      .exec();

    if (users.length < 1) {
      return response.status(HttpStatus.UNAUTHORIZED).json({
        message: 'Auth failed'
      });
    }

    const user = users[0];
    bcrypt.compare(request.body.password, user.password, (err, result) => {
      if (err) {
        return response.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Auth failed'
        });
      }
      if (result) {
        request.session.user = {
          email: user.email,
          name: user.name
        };

        return response.status(200).json({
          success: true,
          message: 'Login successful'
        });
      } else {
        return response.status(HttpStatus.UNAUTHORIZED).json({
          message: 'Auth failed'
        });
      }
    });
  } catch (err) {
    response.status(500).json({
      error: err
    });
  }
};

exports.users_logout = (req, res, next) => {
  // TODO review
  try {
    const user = req.session.user;
    if (user) {
      req.session.destroy(err => {
        if (err) throw err;
        res.clearCookie(process.env.SESSION_NAME);
        res.status(HttpStatus.OK).json({
          success: true,
          message: 'Logout successful'
        });
      });
    } else {
      throw new Error('Something went wrong');
    }
  } catch (err) {
    res.status(422).json({ error: err });
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
