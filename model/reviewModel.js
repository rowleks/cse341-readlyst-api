const mongoose = require('mongoose')
const reviewSchema = require('./schemas/reviewSchema')

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)

const findAll = () => Review.find({}).populate(['user', 'book'])
const findById = id => Review.findById(id).populate(['user', 'book'])
const create = async reviewData =>
  (await new Review(reviewData).save()).populate(['user', 'book'])
const updateById = (id, reviewData) =>
  Review.findByIdAndUpdate(id, reviewData, {
    returnDocument: 'after',
  }).populate(['user', 'book'])
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
