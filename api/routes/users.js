import express from 'express';
import checkAuth from '../middleware/check-auth';
import UsersController from '../controllers/users';

const router = express.Router();

router.post('/signup', UsersController.users_signup);
router.post('/login', UsersController.users_login);
router.delete('/:userId', checkAuth, UsersController.users_delete_user);

module.exports = router;
