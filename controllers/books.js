const Book = require('../model/books')

const getAllBooks = async (_, res) => {
  const books = await Book.find({})
  res.json(books)
}

const getBookById = async (req, res) => {
  const book = await Book.findById(req.params.id)
  if (!book) {
    return bookNotFound(res)
  }
  res.json(book)
}

const addBook = async (req, res) => {
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
  const { title, author, publishedYear, genres, description, coverImageUrl } =
    req.body

  const updatedBook = await Book.findByIdAndUpdate(
    req.params.id,
    { title, author, publishedYear, genres, description, coverImageUrl },
    { new: true }
  )

  if (!updatedBook) {
    return bookNotFound(res)
  }
  res.json(updatedBook)
}

const deleteBook = async (req, res) => {
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
