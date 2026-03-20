const Users = require('../model/users')

const getAllUsers = async (_, res) => {
  const users = await Users.find({})
  res.json(users)
}

const getUserById = async (req, res) => {
  const user = await Users.findById(req.params.id)
  if (!user) {
    return userNotFound(res)
  }
  res.json(user)
}

const deleteUser = async (req, res) => {
  const deletedUser = await Users.findByIdAndDelete(req.params.id)
  if (!deletedUser) {
    return userNotFound(res)
  }
  res.status(204).end()
}

const userNotFound = res => res.status(404).json({ error: 'User not found' })

module.exports = {
  getAllUsers,
  getUserById,
  deleteUser,
}
