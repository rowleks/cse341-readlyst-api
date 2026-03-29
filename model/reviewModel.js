const mongoose = require('mongoose')
const reviewSchema = require('./schemas/reviewSchema')

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)

const findAll = () => Review.find({})
const findById = id => Review.findById(id)
const create = reviewData => new Review(reviewData).save()
const updateById = (id, reviewData) =>
  Review.findByIdAndUpdate(id, reviewData, { returnDocument: 'after' })
const deleteById = id => Review.findByIdAndDelete(id)
const deleteMany = filter => Review.deleteMany(filter)

module.exports = {
  Review,
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  deleteMany,
}
