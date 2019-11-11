import express from 'express';
import HttpStatus from 'http-status-codes';

import checkAuthentication from '../auth/authMiddleware';

const router = express.Router();

// @route   GET api/places
// @desc    List places
// @access  Private
router.get('/', checkAuthentication, (request, response) => {
  response.status(HttpStatus.OK).json([
    {
      name: '5 a Clock Place'
    },
    {
      name: 'Tea & Coffee Place'
    }
  ]);
});

module.exports = router;
