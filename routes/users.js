const router = require('express').Router()
const {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
} = require('../controllers/users')
const {
  validateCreateUser,
  validateUpdateUser,
} = require('../middlewares/userValidator')

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', validateCreateUser, createUser)
router.put('/:id', validateUpdateUser, updateUser)
router.delete('/:id', deleteUser)

module.exports = router
