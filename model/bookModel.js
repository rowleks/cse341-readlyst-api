const mongoose = require('mongoose')
const bookSchema = require('./schemas/bookSchema')
require('./readlistModel')
require('./reviewModel')

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema)

const findAll = () => Book.find({})
const findById = id => Book.findById(id)
const create = bookData => new Book(bookData).save()
const updateById = (id, bookData) =>
  Book.findByIdAndUpdate(id, bookData, { returnDocument: 'after' })
const deleteById = id => Book.findByIdAndDelete(id)
const deleteMany = filter => Book.deleteMany(filter)
const insertMany = books => Book.insertMany(books)

module.exports = {
  Book,
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  deleteMany,
  insertMany,
}
