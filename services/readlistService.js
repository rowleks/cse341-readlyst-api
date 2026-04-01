const readlistModel = require('../model/readlistModel')

const getAllReadlists = async () => await readlistModel.findAll()

const getReadlistById = async id => await readlistModel.findById(id)

const addReadlist = async readlistData =>
  await readlistModel.create(readlistData)

const updateReadlist = async (id, readlistData) =>
  await readlistModel.updateById(id, readlistData)

const deleteReadlist = async id => await readlistModel.deleteById(id)

module.exports = {
  getAllReadlists,
  getReadlistById,
  addReadlist,
  updateReadlist,
  deleteReadlist,
}
