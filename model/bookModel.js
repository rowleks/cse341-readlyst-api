const mongoose = require('mongoose')
const bookSchema = require('./schemas/bookSchema')
require('./readlistModel')
require('./reviewModel')

const Book = mongoose.models.Book || mongoose.model('Book', bookSchema)

const findAll = async () => await Book.find({})
const findById = async id => await Book.findById(id)
const create = async bookData => await new Book(bookData).save()
const updateById = async (id, bookData) =>
  await Book.findByIdAndUpdate(id, bookData, { returnDocument: 'after' })
const deleteById = async id => await Book.findByIdAndDelete(id)
const deleteMany = async filter => await Book.deleteMany(filter)
const insertMany = async books => await Book.insertMany(books)

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
