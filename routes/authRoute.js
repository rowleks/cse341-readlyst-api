const express = require('express')
const router = express.Router()
const {
  register,
  login,
  googleAuth,
  googleCallback,
  me,
  exchangeToken,
} = require('../controllers/authController')
const { authenticate } = require('../middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.post('/exchange-token', exchangeToken)
router.get('/google', googleAuth)
router.get('/google/callback', googleCallback)
router.get('/me', authenticate, me)

module.exports = router
