const { body, validationResult } = require('express-validator')

const validateUser = [
  body('name')
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Name must be between 3 and 50 characters'),
  body('username')
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Username must be between 3 and 30 characters'),
  body('email')
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email address'),
  body('password').custom((value, { req }) => {
    if (req.method === 'POST' && (!value || value.length < 8)) {
      throw new Error(
        'Password is required and must be at least 8 characters long'
      )
    }
    if (value && value.length < 8) {
      throw new Error('Password must be at least 8 characters long')
    }
    return true
  }),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

module.exports = validateUser
