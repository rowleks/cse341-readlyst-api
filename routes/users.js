const router = require('express').Router()
const {
  getAllUsers,
  getUserById,
  deleteUser,
  createUser,
  updateUser,
} = require('../controllers/users')
const validateUser = require('../middlewares/userValidator')

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.post('/', validateUser, createUser)
router.put('/:id', validateUser, updateUser)
router.delete('/:id', deleteUser)

module.exports = router
