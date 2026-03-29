const mongoose = require('mongoose')
const toJsonPlugin = require('../../utils/toJsonPlugin')

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      validate: {
        validator: async v => await mongoose.model('User').exists({ _id: v }),
        message: 'User does not exist',
      },
    },
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
      validate: {
        validator: async v => await mongoose.model('Book').exists({ _id: v }),
        message: 'Book does not exist',
      },
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

module.exports = reviewSchema
