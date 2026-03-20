const router = require('express').Router()
const { getAllUsers, getUserById, deleteUser } = require('../controllers/users')

router.get('/', getAllUsers)
router.get('/:id', getUserById)
router.delete('/:id', deleteUser)

module.exports = router
