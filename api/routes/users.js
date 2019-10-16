import express from 'express';
import checkAuth from '../middleware/check-auth';
import UsersController from '../controllers/users';

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
router.post('/logout', checkAuth, UsersController.users_logout);

// @route   DELETE api/users/:userId
// @desc    Register user
// @access  Private
router.delete('/:userId', checkAuth, UsersController.users_delete_user);

module.exports = router;
