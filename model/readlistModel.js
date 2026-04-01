const mongoose = require('mongoose')
const readlistSchema = require('./schemas/readlistSchema')

const Readlist =
  mongoose.models.Readlist || mongoose.model('Readlist', readlistSchema)

const findAll = async () => await Readlist.find({}).populate(['user', 'book'])

const findById = async id =>
  await Readlist.findById(id).populate(['user', 'book'])

const create = async readlistData =>
  await (await new Readlist(readlistData).save()).populate(['user', 'book'])

const updateById = async (id, readlistData) =>
  await Readlist.findByIdAndUpdate(id, readlistData, {
    returnDocument: 'after',
    runValidators: true,
  }).populate(['user', 'book'])

const deleteById = async id => await Readlist.findByIdAndDelete(id)

const deleteMany = async filter => await Readlist.deleteMany(filter)

module.exports = {
  Readlist,
  findAll,
  findById,
  create,
  updateById,
  deleteById,
  deleteMany,
}
