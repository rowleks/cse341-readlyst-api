const { body, validationResult } = require('express-validator')

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  next()
}

const validateCreateReadlist = [
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
  body('status')
    .optional()
    .isIn(['wishlist', 'reading', 'completed', 'dropped'])
    .withMessage('Invalid status value'),
  body('progress')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Progress must be a non-negative integer'),
  body('startedAt').optional().isISO8601().withMessage('Invalid start date'),
  body('completedAt')
    .optional()
    .isISO8601()
    .withMessage('Invalid completion date'),
  validate,
]

const validateUpdateReadlist = [
  body('user').optional().isMongoId().withMessage('Invalid User ID format'),
  body('book').optional().isMongoId().withMessage('Invalid Book ID format'),
  body('status')
    .optional()
    .isIn(['wishlist', 'reading', 'completed', 'dropped'])
    .withMessage('Invalid status value'),
  body('progress')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Progress must be a non-negative integer'),
  validate,
]

module.exports = { validateCreateReadlist, validateUpdateReadlist }
