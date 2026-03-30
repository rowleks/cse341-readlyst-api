const readlistService = require('../services/readlistService')

const getAllReadlists = async (_, res) => {
  // #swagger.tags = ['Readlist']
  // #swagger.summary = 'Get all readlist entries'
  const entries = await readlistService.getAllReadlists()
  res.json(entries)
}

const getReadlistById = async (req, res) => {
  // #swagger.tags = ['Readlist']
  // #swagger.summary = 'Get readlist entry by ID'
  /* #swagger.responses[404] = { description: 'Readlist entry not found' } */
  const entry = await readlistService.getReadlistById(req.params.id)
  if (!entry) {
    return readlistNotFound(res)
  }
  res.json(entry)
}

const addReadlist = async (req, res) => {
  // #swagger.tags = ['Readlist']
  // #swagger.summary = 'Add a book to a user\'s readlist'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Readlist entry data',
      schema: { $ref: '#/definitions/Readlist' }
  } */
  const savedEntry = await readlistService.addReadlist(req.body)
  res.status(201).json(savedEntry)
}

const updateReadlist = async (req, res) => {
  // #swagger.tags = ['Readlist']
  // #swagger.summary = 'Update a readlist entry'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Updated readlist data',
      schema: { $ref: '#/definitions/UpdateReadlist' }
  } */
  /* #swagger.responses[404] = { description: 'Readlist entry not found' } */
  const updatedEntry = await readlistService.updateReadlist(
    req.params.id,
    req.body
  )

  if (!updatedEntry) {
    return readlistNotFound(res)
  }
  res.json(updatedEntry)
}

const deleteReadlist = async (req, res) => {
  // #swagger.tags = ['Readlist']
  // #swagger.summary = 'Remove a book from a readlist'
  /* #swagger.responses[404] = { description: 'Readlist entry not found' } */
  const deletedEntry = await readlistService.deleteReadlist(req.params.id)
  if (!deletedEntry) {
    return readlistNotFound(res)
  }
  res.status(204).end()
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
