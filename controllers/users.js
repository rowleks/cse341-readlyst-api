const Users = require('../model/users')

const getAllUsers = async (_, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get all users'
  const users = await Users.find({})
  res.json(users)
}

const getUserById = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Get user by ID'
  const user = await Users.findById(req.params.id)
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
  const { name, username, email, password } = req.body
  const user = new Users({
    name,
    username,
    email,
    passwordHash: password,
  })
  const savedUser = await user.save()
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
  const { name, username, email, password } = req.body
  const user = await Users.findByIdAndUpdate(
    req.params.id,
    { name, username, email, passwordHash: password },
    { returnDocument: 'after' }
  )
  if (!user) {
    return userNotFound(res)
  }
  res.json(user)
}

const deleteUser = async (req, res) => {
  // #swagger.tags = ['Users']
  // #swagger.summary = 'Delete user'
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
  createUser,
  updateUser,
  deleteUser,
}
