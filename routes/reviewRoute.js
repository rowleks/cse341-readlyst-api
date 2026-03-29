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

router.get('/', getAllReviews)
router.get('/:id', getReviewById)
router.post('/', validateCreateReview, addReview)
router.put('/:id', validateUpdateReview, updateReview)
router.delete('/:id', deleteReview)

module.exports = router
