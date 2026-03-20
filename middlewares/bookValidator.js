const { body, validationResult } = require('express-validator')

const validateBook = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 100 })
    .withMessage('Title must be between 3 and 100 characters'),
  body('author')
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ min: 3, max: 30 })
    .withMessage('Author must be between 3 and 30 characters'),
  body('publishedYear')
    .optional()
    .isInt()
    .withMessage('Published year must be a valid number'),
  body('genres').optional().isArray().withMessage('Genres must be an array'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string')
    .isLength({ max: 500 })
    .withMessage('Description cannot exceed 500 characters'),
  body('coverImageUrl')
    .optional()
    .isURL()
    .withMessage('Cover Image URL must be a valid URL'),
  (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }
    next()
  },
]

module.exports = validateBook
