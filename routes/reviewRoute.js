const router = require('express').Router()
const {
  getAllReviews,
  getReviewById,
  addReview,
  updateReview,
  deleteReview,
} = require('../controllers/reviewController')
const {
  validateCreateReview,
  validateUpdateReview,
} = require('../middlewares/reviewValidator')
const { authenticate } = require('../middlewares/auth')

router.get('/', getAllReviews)
router.get('/:id', getReviewById)
router.post('/', authenticate, validateCreateReview, addReview)
router.put('/:id', authenticate, validateUpdateReview, updateReview)
router.delete('/:id', authenticate, deleteReview)

module.exports = router
