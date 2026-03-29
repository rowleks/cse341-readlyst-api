const mongoose = require('mongoose')
const userSchema = require('./schemas/userSchema')
require('./readlistModel')
require('./reviewModel')

const User = mongoose.models.User || mongoose.model('User', userSchema)

const findAll = () => User.find({})
const findById = id => User.findById(id)
const create = userData => new User(userData).save()
const updateById = (id, userData) =>
  User.findByIdAndUpdate(id, userData, { returnDocument: 'after' })
const deleteById = id => User.findByIdAndDelete(id)
const deleteMany = filter => User.deleteMany(filter)
const insertMany = users => User.insertMany(users)

module.exports = {
  User,
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  deleteMany,
  insertMany,
}
