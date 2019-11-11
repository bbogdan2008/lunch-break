import HttpStatus from 'http-status-codes';

const checkAuthentication = (request, response, next) => {
  const user = request.session.user;
  if (user) {
    next();
  } else {
    response.status(HttpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Unauthorized: No session'
    });
  }
};

module.exports = checkAuthentication;
