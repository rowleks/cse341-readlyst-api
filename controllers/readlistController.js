const readlistService = require('../services/readlistService')

const getAllReadlists = async (_, res, next) => {
  // #swagger.tags = ['Readlist']
  // #swagger.summary = 'Get all readlist entries'
  try {
    const entries = await readlistService.getAllReadlists()
    res.json(entries)
  } catch (err) {
    next(err)
  }
}

const getReadlistById = async (req, res, next) => {
  // #swagger.tags = ['Readlist']
  // #swagger.summary = 'Get readlist entry by ID'
  try {
    const entry = await readlistService.getReadlistById(req.params.id)
    if (!entry) {
      return readlistNotFound(res)
    }
    res.json(entry)
  } catch (err) {
    next(err)
  }
}

const addReadlist = async (req, res, next) => {
  // #swagger.tags = ['Readlist']
  // #swagger.summary = 'Add a book to a user\'s readlist'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Readlist entry data',
      schema: { $ref: '#/definitions/Readlist' }
  } */
  try {
    const savedEntry = await readlistService.addReadlist(req.body)
    res.status(201).json(savedEntry)
  } catch (err) {
    next(err)
  }
}

const updateReadlist = async (req, res, next) => {
  // #swagger.tags = ['Readlist']
  // #swagger.summary = 'Update a readlist entry'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated readlist data',
      schema: { $ref: '#/definitions/UpdateReadlist' }
  } */
  try {
    const updatedEntry = await readlistService.updateReadlist(
      req.params.id,
      req.body
    )

    if (!updatedEntry) {
      return readlistNotFound(res)
    }
    res.json(updatedEntry)
  } catch (err) {
    next(err)
  }
}

const deleteReadlist = async (req, res, next) => {
  // #swagger.tags = ['Readlist']
  // #swagger.summary = 'Remove a book from a readlist'
  try {
    const deletedEntry = await readlistService.deleteReadlist(req.params.id)
    if (!deletedEntry) {
      return readlistNotFound(res)
    }
    res.status(204).end()
  } catch (err) {
    next(err)
  }
}

const readlistNotFound = res =>
  res.status(404).json({ error: 'Readlist entry not found' })

module.exports = {
  getAllReadlists,
  getReadlistById,
  addReadlist,
  updateReadlist,
  deleteReadlist,
}
