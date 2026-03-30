const jwt = require('jsonwebtoken')
const { jwtSecret, jwtExpiresIn } = require('../config/auth')

const generateToken = user => {
  const payload = {
    id: user._id,
    email: user.email,
    role: user.role,
  }
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn })
}

const verifyToken = token => jwt.verify(token, jwtSecret)

module.exports = {
  generateToken,
  verifyToken,
}
