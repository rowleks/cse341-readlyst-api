//bookService.js

const bookModel = require('../model/bookModel')

const getAllBooks = () => bookModel.findAll()
const getBookById = id => bookModel.findById(id)
const createBook = bookData => bookModel.create(bookData)
const updateBook = (id, bookData) => bookModel.updateById(id, bookData)
const deleteBook = id => bookModel.deleteById(id)

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
}
