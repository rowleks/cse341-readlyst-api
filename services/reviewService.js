const reviewModel = require('../model/reviewModel')

const getAllReviews = () => reviewModel.findAll()
const getReviewById = id => reviewModel.findById(id)
const addReview = reviewData => reviewModel.create(reviewData)
const updateReview = (id, reviewData) => reviewModel.updateById(id, reviewData)
const deleteReview = id => reviewModel.deleteById(id)

module.exports = {
  getAllReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
}
