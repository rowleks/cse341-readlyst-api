const Book = require('../model/books')

const getAllBooks = async (_, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Get all books'
  const books = await Book.find({})
  res.json(books)
}

const getBookById = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Get book by ID'
  const book = await Book.findById(req.params.id)
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
      schema: {
        $title: 'Book Title',
        $author: 'Author Name',
        publishedYear: 2023,
        genres: ['Genre'],
        description: 'Book Description',
        coverImageUrl: 'http://example.com/image.jpg'
      }
  } */
  const { title, author, publishedYear, genres, description, coverImageUrl } =
    req.body

  const newBook = new Book({
    title,
    author,
    publishedYear,
    genres,
    description,
    coverImageUrl,
  })

  const savedBook = await newBook.save()
  res.status(201).json(savedBook)
}

const updateBook = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Update a book'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Book data',
      schema: {
        $title: 'Book Title',
        $author: 'Author Name',
        publishedYear: 2023,
        genres: ['Genre'],
        description: 'Book Description',
        coverImageUrl: 'http://example.com/image.jpg'
      }
  } */
  const { title, author, publishedYear, genres, description, coverImageUrl } =
    req.body

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { title, author, publishedYear, genres, description, coverImageUrl },
    { returnDocument: 'after' }
  )

  if (!updatedBook) {
    return bookNotFound(res)
  }
  res.json(updatedBook)
}

const deleteBook = async (req, res) => {
  // #swagger.tags = ['Books']
  // #swagger.summary = 'Delete a book'
  const deletedBook = await Book.findByIdAndDelete(req.params.id)
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
