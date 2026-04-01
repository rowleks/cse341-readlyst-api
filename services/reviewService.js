const reviewModel = require('../model/reviewModel')

const getAllReviews = async () => await reviewModel.findAll()

const getReviewById = async id => await reviewModel.findById(id)

const addReview = async reviewData => await reviewModel.create(reviewData)

const updateReview = async (id, reviewData) =>
  await reviewModel.updateById(id, reviewData)

const deleteReview = async id => await reviewModel.deleteById(id)

module.exports = {
  getAllReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
}
