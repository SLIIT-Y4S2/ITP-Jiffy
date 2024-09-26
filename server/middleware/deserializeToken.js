const jwt = require('jsonwebtoken');

const deserializeToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) {
    return next();
  }
  jwt.verify(token, process.env.SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403); // Forbidden
    }
    req.user = user;
    return next();
  });
};

module.exports = deserializeToken;