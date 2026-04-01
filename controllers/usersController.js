const userService = require('../services/userService')

const getAllUsers = async (_, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get all users'
  try {
    const users = await userService.getAllUsers()
    res.json(users)
  } catch (err) {
    next(err)
  }
}

const getUserById = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get user by ID'
  /* #swagger.responses[404] = { description: 'User not found' } */
  try {
    const user = await userService.getUserById(req.params.id)
    if (!user) {
      return userNotFound(res)
    }
    res.json(user)
  } catch (err) {
    next(err)
  }
}

const createUser = async (req, res, next) => {
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
  try {
    const savedUser = await userService.createUser(req.body)
    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
}

const updateUser = async (req, res, next) => {
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
  /* #swagger.responses[404] = { description: 'User not found' } */
  try {
    const updatedUser = await userService.updateUser(req.params.id, req.body)
    if (!updatedUser) {
      return userNotFound(res)
    }
    res.json(updatedUser)
  } catch (err) {
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete user'
  /* #swagger.responses[404] = { description: 'User not found' } */
  try {
    const deletedUser = await userService.deleteUser(req.params.id)
    if (!deletedUser) {
      return userNotFound(res)
    }
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

const userNotFound = res => res.status(404).json({ error: 'User not found' })

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
}
