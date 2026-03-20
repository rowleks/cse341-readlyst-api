const router = require('express').Router()
const {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
} = require('../controllers/books')
const validateBook = require('../middlewares/bookValidator')

router.get('/', getAllBooks)
router.get('/:id', getBookById)
router.post('/', validateBook, addBook)
router.put('/:id', validateBook, updateBook)
router.delete('/:id', deleteBook)

module.exports = router
