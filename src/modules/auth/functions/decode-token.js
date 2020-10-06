const jwt = require('jsonwebtoken');

exports.decodeToken = (token) => {
  return jwt.decode(token);
};
