const { body, validationResult } = require('express-validator')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const validateCreateReview = [
  body('user')
    .notEmpty()
    .withMessage('User ID is required')
    .isMongoId()
    .withMessage('Invalid User ID format'),
  body('book')
    .notEmpty()
    .withMessage('Book ID is required')
    .isMongoId()
    .withMessage('Invalid Book ID format'),
  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isString().withMessage('Comment must be a string'),
  validate,
]

const validateUpdateReview = [
  body('user').optional().isMongoId().withMessage('Invalid User ID format'),
  body('book').optional().isMongoId().withMessage('Invalid Book ID format'),
  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be between 1 and 5'),
  body('comment').optional().isString().withMessage('Comment must be a string'),
  validate,
]

module.exports = { validateCreateReview, validateUpdateReview }
