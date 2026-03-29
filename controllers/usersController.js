const userService = require('../services/userService')

const getAllUsers = async (_, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get all users'
  const users = await userService.getAllUsers()
  res.json(users)
}

const getUserById = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get user by ID'
  const user = await userService.getUserById(req.params.id)
  if (!user) {
    return userNotFound(res)
  }
  res.json(user)
}

const createUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Create user'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'User data',
      schema: {
        $name: 'John Doe',
        $username: 'johndoe',
        $email: 'john@example.com',
        $password: 'secret123'
      }
  } */
  const savedUser = await userService.createUser(req.body)
  res.status(201).json(savedUser)
}

const updateUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Update user'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'User data',
      schema: {
        name: 'John Doe',
        username: 'johndoe',
        email: 'john@example.com',
        password: 'secret123'
      }
  } */
  const updatedUser = await userService.updateUser(req.params.id, req.body)
  if (!updatedUser) {
    return userNotFound(res)
  }
  res.json(updatedUser)
}

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete user'
  const deletedUser = await userService.deleteUser(req.params.id)
  if (!deletedUser) {
    return userNotFound(res)
  }
  res.status(204).end()
}

const userNotFound = res => res.status(404).json({ error: 'User not found' })

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
