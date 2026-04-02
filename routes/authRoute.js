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
const { validateCreateUser } = require('../middlewares/userValidator')

router.post('/register', validateCreateUser, register)
router.post('/login', login)
router.get('/google', googleAuth)
router.get('/google/callback', googleCallback)
router.post('/google/token', exchangeToken)
router.get('/me', authenticate, me)

module.exports = router
