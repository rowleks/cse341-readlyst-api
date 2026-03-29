const router = require('express').Router()
const {
  getAllReadlists,
  getReadlistById,
  addReadlist,
  updateReadlist,
  deleteReadlist,
} = require('../controllers/readlistController')
const {
  validateCreateReadlist,
  validateUpdateReadlist,
} = require('../middlewares/readlistValidator')

router.get('/', getAllReadlists)
router.get('/:id', getReadlistById)
router.post('/', validateCreateReadlist, addReadlist)
router.put('/:id', validateUpdateReadlist, updateReadlist)
router.delete('/:id', deleteReadlist)

module.exports = router
