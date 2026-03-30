const reviewService = require('../services/reviewService')

const getAllReviews = async (_, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get all reviews'
  const reviews = await reviewService.getAllReviews()
  res.json(reviews)
}

const getReviewById = async (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get review by ID'
  /* #swagger.responses[404] = { description: 'Review not found' } */
  const review = await reviewService.getReviewById(req.params.id)
  if (!review) {
    return reviewNotFound(res)
  }
  res.json(review)
}

const addReview = async (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Create a new review'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Review data',
      schema: { $ref: '#/definitions/Review' }
  } */
  const savedReview = await reviewService.addReview(req.body)
  res.status(201).json(savedReview)
}

const updateReview = async (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Update a review'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated review data',
      schema: { $ref: '#/definitions/UpdateReview' }
  } */
  /* #swagger.responses[404] = { description: 'Review not found' } */
  const updatedReview = await reviewService.updateReview(
    req.params.id,
    req.body
  )
  if (!updatedReview) {
    return reviewNotFound(res)
  }
  res.json(updatedReview)
}

const deleteReview = async (req, res) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Delete a review'
  /* #swagger.responses[404] = { description: 'Review not found' } */
  const deletedReview = await reviewService.deleteReview(req.params.id)
  if (!deletedReview) {
    return reviewNotFound(res)
  }
  res.status(204).end()
}

const reviewNotFound = res =>
  res.status(404).json({ error: 'Review not found' })

module.exports = {
  getAllReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
}
