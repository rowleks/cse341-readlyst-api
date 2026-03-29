const mongoose = require('mongoose')
const readlistSchema = require('./schemas/readlistSchema')

const Readlist =
  mongoose.models.Readlist || mongoose.model('Readlist', readlistSchema)

const findAll = () => Readlist.find({})
const findById = id => Readlist.findById(id)
const create = readlistData => new Readlist(readlistData).save()
const updateById = (id, readlistData) =>
  Readlist.findByIdAndUpdate(id, readlistData, { returnDocument: 'after' })
const deleteById = id => Readlist.findByIdAndDelete(id)
const deleteMany = filter => Readlist.deleteMany(filter)

module.exports = {
  Readlist,
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  deleteMany,
}
