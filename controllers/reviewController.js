const reviewService = require('../services/reviewService')

const getAllReviews = async (_, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get all reviews'
  try {
    const reviews = await reviewService.getAllReviews()
    res.json(reviews)
  } catch (err) {
    next(err)
  }
}

const getReviewById = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Get review by ID'
  try {
    const review = await reviewService.getReviewById(req.params.id)
    if (!review) {
      return reviewNotFound(res)
    }
    res.json(review)
  } catch (err) {
    next(err)
  }
}

const addReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Create a new review'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Review data',
      schema: { $ref: '#/definitions/Review' }
  } */
  try {
    const userId = req.user._id || req.user.id
    const savedReview = await reviewService.addReview(req.body, userId)
    res.status(201).json(savedReview)
  } catch (err) {
    next(err)
  }
}

const updateReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Update a review'
  // #swagger.description = 'User can only update their own review unless admin'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated review data',
      schema: { $ref: '#/definitions/UpdateReview' }
  } */
  try {
    const userId = req.user.id || req.user._id
    const isAdmin = req.user.role === 'admin'
    const updatedReview = await reviewService.updateReview(
      req.params.id,
      req.body,
      userId,
      isAdmin
    )
    if (!updatedReview) {
      return reviewNotFound(res)
    }
    res.json(updatedReview)
  } catch (err) {
    if (err.status === 403) {
      return res.status(403).json({ message: err.message })
    }
    next(err)
  }
}

const deleteReview = async (req, res, next) => {
  // #swagger.tags = ['Reviews']
  // #swagger.summary = 'Delete a review'
  // #swagger.description = 'User can only delete their own review unless admin'
  try {
    const userId = req.user.id || req.user._id
    const isAdmin = req.user.role === 'admin'
    const deletedReview = await reviewService.deleteReview(
      req.params.id,
      userId,
      isAdmin
    )
    if (!deletedReview) {
      return reviewNotFound(res)
    }
    res.status(204).end()
  } catch (err) {
    if (err.status === 403) {
      return res.status(403).json({ message: err.message })
    }
    next(err)
  }
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
