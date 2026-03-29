const readlistModel = require('../model/readlistModel')

const getAllReadlists = () => readlistModel.findAll()

const getReadlistById = id => readlistModel.findById(id)

const addReadlist = readlistData => readlistModel.create(readlistData)

const updateReadlist = (id, readlistData) =>
  readlistModel.updateById(id, readlistData)

const deleteReadlist = id => readlistModel.deleteById(id)

module.exports = {
  getAllReadlists,
  getReadlistById,
  addReadlist,
  updateReadlist,
  deleteReadlist,
}
