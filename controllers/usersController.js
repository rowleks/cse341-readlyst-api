const userService = require('../services/userService')

const getAllUsers = async (_, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get all users'
  // #swagger.description = 'Admin only'
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
  // #swagger.description = 'Admin only'
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

const updateUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Update user'
  // #swagger.description = 'User can only update their own profile unless admin'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'User data',
      schema: { $ref: '#/definitions/UpdateUser' }
  } */
  try {
    const userId = req.user._id || req.user.id
    const isAdmin = req.user.role === 'admin'
    const updatedUser = await userService.updateUser(
      req.params.id,
      req.body,
      userId,
      isAdmin
    )
    if (!updatedUser) {
      return userNotFound(res)
    }
    res.json(updatedUser)
  } catch (err) {
    if (err.status === 403) {
      return res.status(403).json({ message: err.message })
    }
    next(err)
  }
}

const deleteUser = async (req, res, next) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete user'
  // #swagger.description = 'User can only delete their own account unless admin'
  try {
    const userId = req.user._id || req.user.id
    const isAdmin = req.user.role === 'admin'
    const deletedUser = await userService.deleteUser(
      req.params.id,
      userId,
      isAdmin
    )
    if (!deletedUser) {
      return userNotFound(res)
    }
    res.status(204).end()
  } catch (err) {
    if (err.status === 403) {
      return res.status(403).json({ message: err.message })
    }
    next(err)
  }
}

const userNotFound = res => res.status(404).json({ error: 'User not found' })

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
}
