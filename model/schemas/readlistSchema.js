const mongoose = require('mongoose')
const toJsonPlugin = require('../../utils/toJsonPlugin')

const readlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async v => await mongoose.models.User.exists({ _id: v }),
        message: 'User does not exist',
      },
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
      validate: {
        validator: async v => await mongoose.models.Book.exists({ _id: v }),
        message: 'Book does not exist',
      },
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

module.exports = readlistSchema
