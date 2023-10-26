const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {
  const auth = req.query.auth;

  if (!auth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(auth, 'secret-key', (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'auth key is invalid' });
    }
    req.user = user;
    next();
  });
}

module.exports = authenticateJWT;