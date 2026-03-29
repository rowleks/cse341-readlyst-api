const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Readlyst API docs',
    description: 'API documentation for the endpoints',
  },
  host: 'cse341-readlyst-api.onrender.com',
  schemes: ['https'],
  definitions: {
    Book: {
      $title: 'Book Title',
      $author: 'Author Name',
      publishedYear: 2023,
      genres: ['Genre'],
      description: 'Book Description',
      coverImageUrl: 'http://example.com/image.jpg',
    },
    UpdateBook: {
      title: 'Book Title',
      author: 'Author Name',
      publishedYear: 2023,
      genres: ['Genre'],
      description: 'Book Description',
      coverImageUrl: 'http://example.com/image.jpg',
    },
    User: {
      $name: 'John Doe',
      $username: 'johndoe',
      $email: 'john@example.com',
      $password: 'secret123',
    },
    UpdateUser: {
      name: 'John Doe',
      username: 'johndoe',
      email: 'john@example.com',
      password: 'secret123',
    },
  },
}

const outputFile = './docs/swagger-output.json'
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)
