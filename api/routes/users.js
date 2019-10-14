import express from 'express';
import checkAuth from '../middleware/check-auth';
import UsersController from '../controllers/users';

const router = express.Router();

// @route   POST api/users/signup
// @desc    Register user
// @access  Public
router.post('/signup', UsersController.users_signup);

// @route   POST api/users/login
// @desc    Login user
// @access  Public
router.post('/login', UsersController.users_login);

// @route   DELETE api/users/:userId
// @desc    Register user
// @access  Private
router.delete('/:userId', checkAuth, UsersController.users_delete_user);

module.exports = router;
