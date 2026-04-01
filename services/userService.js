const userModel = require('../model/userModel')
const bcrypt = require('bcryptjs')

const getAllUsers = async () => await userModel.findAll()

const getUserById = async id => await userModel.findById(id)

const getUserByEmail = async email => await userModel.findOne({ email })

const getUserByGoogleId = async googleId =>
  await userModel.findOne({ googleId })

const createUser = async ({ name, username, email, password }) => {
  const passwordHash = password ? await bcrypt.hash(password, 10) : undefined
  return await userModel.create({ name, username, email, passwordHash })
}

const createOrUpdateGoogleUser = async ({ name, email, googleId, avatar }) => {
  let user = await getUserByGoogleId(googleId)
  if (user) return user

  user = await getUserByEmail(email)
  if (user) {
    return await userModel.updateById(user._id, {
      googleId,
      avatar,
      isEmailVerified: true,
    })
  }

  return await userModel.create({
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
  return await userModel.updateById(id, updateData)
}

const deleteUser = async id => await userModel.deleteById(id)

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
