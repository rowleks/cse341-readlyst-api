const reviewModel = require('../model/reviewModel')

const getAllReviews = async () => await reviewModel.findAll()

const getReviewById = async id => await reviewModel.findById(id)

const addReview = async (reviewData, userId) =>
  await reviewModel.create({ ...reviewData, user: userId })

const updateReview = async (id, reviewData, userId, isAdmin) => {
  const review = await reviewModel.findById(id)
  if (!review) return null

  const reviewOwnerId = review.user.toString()
  if (reviewOwnerId !== userId && !isAdmin) {
    const error = new Error('Forbidden: You can only modify your own reviews')
    error.status = 403
    throw error
  }

  return await reviewModel.updateById(id, reviewData)
}

const deleteReview = async (id, userId, isAdmin) => {
  const review = await reviewModel.findById(id)
  if (!review) return null

  const reviewOwnerId = review.user.toString()
  if (reviewOwnerId !== userId && !isAdmin) {
    const error = new Error('Forbidden: You can only delete your own reviews')
    error.status = 403
    throw error
  }

  return await reviewModel.deleteById(id)
}

module.exports = {
  getAllReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
}
