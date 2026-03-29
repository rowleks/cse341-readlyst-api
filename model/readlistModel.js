const mongoose = require('mongoose')
const readlistSchema = require('./schemas/readlistSchema')

const Readlist =
  mongoose.models.Readlist || mongoose.model('Readlist', readlistSchema)

const findAll = () => Readlist.find({}).populate(['user', 'book'])
const findById = id => Readlist.findById(id).populate(['user', 'book'])
const create = async readlistData =>
  (await new Readlist(readlistData).save()).populate(['user', 'book'])
const updateById = (id, readlistData) =>
  Readlist.findByIdAndUpdate(id, readlistData, {
    returnDocument: 'after',
    runValidators: true,
  }).populate(['user', 'book'])
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
