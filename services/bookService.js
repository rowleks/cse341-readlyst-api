//bookService.js

const bookModel = require('../model/bookModel')

const getAllBooks = async () => await bookModel.findAll()

const getBookById = async id => await bookModel.findById(id)

const createBook = async bookData => await bookModel.create(bookData)

const updateBook = async (id, bookData) =>
  await bookModel.updateById(id, bookData)

const deleteBook = async id => await bookModel.deleteById(id)

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
}
