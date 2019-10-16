import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  const token = req.headers.authorization.split(' ')[1];
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
    jwt.verify(token, process.env.JWT_KEY, function(err, decoded) {
      if (err) {
        res.status(401).send('Unauthorized: Invalid token');
      } else {
        req.userData = decoded.decoded;
        next();
      }
    });
  }
};

module.exports = checkAuth;
