import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import models from '../../db';

exports.users_signup = (req, res, next) => {
  models.User.find({ email: req.body.email })
    .exec()
    .then(users => {
      if (users.length > 0) {
        return res.status(409).json({
          message: 'Mail exists'
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

exports.users_login = (req, res, next) => {
  models.User.find({ email: req.body.email }) // TODO use findOne
    .select('_id email name password')
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(401).json({
          message: 'Auth failed'
        });
      }
      const user = users[0];
      bcrypt.compare(req.body.password, user.password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
        if (result) {
          // create token
          const token = jwt.sign(
            {
              userId: user._id,
              name: user.name
            },
            process.env.JWT_KEY,
            { expiresIn: '1h' }
          );
          return res.status(200).json({
            message: 'Auth successful',
            token: token // TODO send more on client for auth model (username)
          });
        } else {
          return res.status(401).json({
            message: 'Auth failed'
          });
        }
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
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
