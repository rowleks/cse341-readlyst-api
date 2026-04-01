const bookService = require('../services/bookService')

const getAllBooks = async (_, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Get all books'
  const books = await bookService.getAllBooks()
  res.json(books)
}

const getBookById = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Get book by ID'
  /* #swagger.responses[404] = { description: 'Book not found' } */
  const book = await bookService.getBookById(req.params.id)
  if (!book) {
    return bookNotFound(res)
  }
  res.json(book)
}

const addBook = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Add a new book'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Book data',
      schema: { $ref: '#/definitions/Book' }
  } */
  const savedBook = await bookService.createBook(req.body)
  res.status(201).json(savedBook)
}

const updateBook = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Update a book'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Book data',
      schema: { $ref: '#/definitions/UpdateBook' }
  } */
  /* #swagger.responses[404] = { description: 'Book not found' } */
  const updatedBook = await bookService.updateBook(req.params.id, req.body)

  if (!updatedBook) {
    return bookNotFound(res)
  }
  res.json(updatedBook)
}

const deleteBook = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Delete a book'
  /* #swagger.responses[404] = { description: 'Book not found' } */
  const deletedBook = await bookService.deleteBook(req.params.id)
  if (!deletedBook) {
    return bookNotFound(res)
  }
  res.status(204).end()
}

const bookNotFound = res => res.status(404).json({ error: 'Book not found' })

module.exports = {
  getAllBooks,
  getBookById,
  addBook,
  updateBook,
  deleteBook,
}
