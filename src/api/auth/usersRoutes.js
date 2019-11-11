import express from 'express';
import checkAuthentication from './authMiddleware';
import UsersController from './usersController';

const router = express.Router();

// @route   POST api/users/register
// @desc    Register user
// @access  Public
router.post('/register', UsersController.users_register);

// @route   POST api/users/login
// @desc    Login user and return JWT token
// @access  Public
router.post('/login', UsersController.users_login);

// @route   POST api/users/logout
// @desc    Logout user
// @access  Public
router.post('/logout', checkAuthentication, UsersController.users_logout);

// @route   DELETE api/users/:userId
// @desc    Register user
// @access  Private
router.delete(
  '/:userId',
  checkAuthentication,
  UsersController.users_delete_user
);

module.exports = router;
