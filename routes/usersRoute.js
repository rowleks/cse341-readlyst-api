const router = require('express').Router()
const {
  getAllUsers,
  getUserById,
  deleteUser,
  updateUser,
} = require('../controllers/usersController')
const { validateUpdateUser } = require('../middlewares/userValidator')
const { authenticate, requireAdmin } = require('../middlewares/auth')

router.get('/', authenticate, requireAdmin, getAllUsers)
router.get('/:id', authenticate, requireAdmin, getUserById)
router.put('/:id', authenticate, validateUpdateUser, updateUser)
router.delete('/:id', authenticate, deleteUser)

module.exports = router
