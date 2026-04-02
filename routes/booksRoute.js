//bookRoute.js

const router = require('express').Router()
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/booksController')
const {
  validateCreateBook,
  validateUpdateBook,
} = require('../middlewares/bookValidator')
const { authenticate, requireAdmin } = require('../middlewares/auth')

router.get('/', getAllBooks)
router.get('/:id', getBookById)
router.post('/', authenticate, requireAdmin, validateCreateBook, addBook)
router.put('/:id', authenticate, requireAdmin, validateUpdateBook, updateBook)
router.delete('/:id', authenticate, requireAdmin, deleteBook)

module.exports = router
