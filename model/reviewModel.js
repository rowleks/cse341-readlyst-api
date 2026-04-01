const mongoose = require('mongoose')
const reviewSchema = require('./schemas/reviewSchema')

const Review = mongoose.models.Review || mongoose.model('Review', reviewSchema)

const findAll = async () => await Review.find({}).populate(['user', 'book'])

const findById = async id =>
  await Review.findById(id).populate(['user', 'book'])

const create = async reviewData =>
  await (await new Review(reviewData).save()).populate(['user', 'book'])

const updateById = async (id, reviewData) =>
  await Review.findByIdAndUpdate(id, reviewData, {
    returnDocument: 'after',
  }).populate(['user', 'book'])

const deleteById = async id => await Review.findByIdAndDelete(id)

const deleteMany = async filter => await Review.deleteMany(filter)

module.exports = {
  Review,
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  deleteMany,
}
