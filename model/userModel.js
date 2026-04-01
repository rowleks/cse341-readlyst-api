const mongoose = require('mongoose')
const userSchema = require('./schemas/userSchema')
require('./readlistModel')
require('./reviewModel')

const User = mongoose.models.User || mongoose.model('User', userSchema)

const findAll = async () => await User.find({})
const findById = async id => await User.findById(id)
const findOne = async filter => await User.findOne(filter)
const create = async userData => await new User(userData).save()
const updateById = async (id, userData) =>
  await User.findByIdAndUpdate(id, userData, { returnDocument: 'after' })
const deleteById = async id => await User.findByIdAndDelete(id)
const deleteMany = async filter => await User.deleteMany(filter)
const insertMany = async users => await User.insertMany(users)

module.exports = {
  User,
  findAll,
  findById,
  findOne,
  create,
  updateById,
  deleteById,
  deleteMany,
  insertMany,
}
