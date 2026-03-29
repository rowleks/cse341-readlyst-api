const mongoose = require('mongoose')
const toJsonPlugin = require('../utils/toJsonPlugin')

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: true,
    },
    comment: String,
  },
  { timestamps: true }
)

reviewSchema.plugin(toJsonPlugin)

// Validate that user exists before saving
reviewSchema.pre('save', async function (next) {
  const User = mongoose.model('User')
  const user = await User.findById(this.user)
  if (!user) {
    throw new Error('User does not exist')
  }
  next()
})

// Validate that book exists before saving
reviewSchema.pre('save', async function (next) {
  const Book = mongoose.model('Book')
  const book = await Book.findById(this.book)
  if (!book) {
    throw new Error('Book does not exist')
  }
  next()
})

const Review = mongoose.model('Review', reviewSchema)

module.exports = Review
