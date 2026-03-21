const router = require('express').Router()
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/books')
const {
  validateCreateBook,
  validateUpdateBook,
} = require('../middlewares/bookValidator')

router.get('/', getAllBooks)
router.get('/:id', getBookById)
router.post('/', validateCreateBook, addBook)
router.put('/:id', validateUpdateBook, updateBook)
router.delete('/:id', deleteBook)

module.exports = router
