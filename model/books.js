const mongoose = require('mongoose')
const toJsonPlugin = require('../utils/toJsonPlugin')

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number },
    genres: [{ type: String }],
    description: { type: String },
    coverImageUrl: { type: String },
  },
  { timestamps: true }
)

bookSchema.plugin(toJsonPlugin)

// Cascade delete: Remove all readlist entries and reviews when book is deleted
bookSchema.pre('findByIdAndDelete', async function (next) {
  const bookId = this._conditions._id
  const Readlist = mongoose.model('Readlist')
  const Review = mongoose.model('Review')
  await Readlist.deleteMany({ book: bookId })
  await Review.deleteMany({ book: bookId })
  next()
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
