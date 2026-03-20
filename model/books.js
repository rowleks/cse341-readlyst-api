const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    publishedYear: { type: Number },
    genres: [{ type: String }],
    description: { type: String },
    coverImageUrl: { type: String },
  },
  { timestamps: true }
)

bookSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  },
})

const Book = mongoose.model('Book', bookSchema)

module.exports = Book
