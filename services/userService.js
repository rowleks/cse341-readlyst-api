const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')

const getAllUsers = () => userModel.findAll()
const getUserById = id => userModel.findById(id)
const getUserByEmail = email => userModel.findOne({ email })
const getUserByGoogleId = googleId => userModel.findOne({ googleId })

const createUser = async ({ name, username, email, password }) => {
  const passwordHash = password ? await bcrypt.hash(password, 10) : undefined
  return userModel.create({ name, username, email, passwordHash })
}

const createOrUpdateGoogleUser = async ({ name, email, googleId, avatar }) => {
  let user = await getUserByGoogleId(googleId)
  if (user) return user

  user = await getUserByEmail(email)
  if (user) {
    return userModel.updateById(user._id, {
      googleId,
      avatar,
      isEmailVerified: true,
    })
  }

  return userModel.create({
    name,
    email,
    googleId,
    avatar,
    isEmailVerified: true,
    passwordHash: await bcrypt.hash(Math.random().toString(36), 10),
  })
}

const validatePassword = (user, password) => {
  if (!user.passwordHash) return false
  return bcrypt.compareSync(password, user.passwordHash)
}

const updateUser = async (id, { name, username, email, password }) => {
  const updateData = { name, username, email }
  if (password) {
    updateData.passwordHash = await bcrypt.hash(password, 10)
  }
  return userModel.updateById(id, updateData)
}

const deleteUser = id => userModel.deleteById(id)

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  getUserByGoogleId,
  createUser,
  createOrUpdateGoogleUser,
  validatePassword,
  updateUser,
  deleteUser,
}
