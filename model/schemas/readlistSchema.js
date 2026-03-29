const mongoose = require('mongoose')
const toJsonPlugin = require('../../utils/toJsonPlugin')

const readlistSchema = new mongoose.Schema(
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
    status: {
      type: String,
      enum: ['wishlist', 'reading', 'completed', 'dropped'],
      default: 'wishlist',
    },
    progress: {
      type: Number,
      default: 0,
    },
    startedAt: Date,
    completedAt: Date,
  },
  { timestamps: true }
)

readlistSchema.plugin(toJsonPlugin)

// Validate that user exists before saving
readlistSchema.pre('save', async function (next) {
  const User = mongoose.model('User')
  const user = await User.findById(this.user)
  if (!user) {
    throw new Error('User does not exist')
  }
  next()
})

// Validate that book exists before saving
readlistSchema.pre('save', async function (next) {
  const Book = mongoose.model('Book')
  const book = await Book.findById(this.book)
  if (!book) {
    throw new Error('Book does not exist')
  }
  next()
})

module.exports = readlistSchema
