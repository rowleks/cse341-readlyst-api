const mongoose = require('mongoose')
const toJsonPlugin = require('../utils/toJsonPlugin')

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

const Readlist = mongoose.model('Readlist', readlistSchema)

module.exports = Readlist
