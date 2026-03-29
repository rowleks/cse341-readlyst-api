const userModel = require('../model/userModel')

const getAllUsers = () => userModel.findAll()
const getUserById = id => userModel.findById(id)
const createUser = ({ name, username, email, password }) =>
  userModel.create({ name, username, email, passwordHash: password })
const updateUser = (id, { name, username, email, password }) =>
  userModel.updateById(id, {
    name,
    username,
    email,
    passwordHash: password,
  })
const deleteUser = id => userModel.deleteById(id)

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
