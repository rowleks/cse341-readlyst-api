const express = require('express')
const router = express.Router()
const {
  register,
  login,
  googleAuth,
  googleCallback,
  me,
} = require('../controllers/authController')
const { authenticate } = require('../middlewares/auth')

router.post('/register', register)
router.post('/login', login)
router.get('/google', googleAuth)
router.get('/google/callback', googleCallback)
router.get('/me', authenticate, me)

module.exports = router
