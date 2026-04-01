const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Readlyst API docs',
    description: 'API documentation for the endpoints',
  },
  host: 'cse341-readlyst-api.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
    bearerAuth: {
      type: 'apiKey',
      name: 'Authorization',
      in: 'header',
      description: 'JWT bearer token',
    },
    oauth2: {
      type: 'oauth2',
      flows: {
        authorizationCode: {
          authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
          tokenUrl: 'https://oauth2.googleapis.com/token',
          scopes: {
            openid: 'OpenID Connect ID token',
            email: 'Read email',
            profile: 'Read profile',
          },
        },
      },
    },
  },
  security: [{ bearerAuth: [] }, { oauth2: [] }],
  responses: {
    404: {
      description: 'Unknown endpoint',
    },
  },
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
    Readlist: {
      $user: 'User ID (ObjectId)',
      $book: 'Book ID (ObjectId)',
      status: 'wishlist',
      progress: 0,
      startedAt: '2023-01-01T00:00:00.000Z',
      completedAt: '2023-01-01T00:00:00.000Z',
    },
    UpdateReadlist: {
      user: 'User ID (ObjectId)',
      book: 'Book ID (ObjectId)',
      status: 'reading',
      progress: 50,
      startedAt: '2023-01-01T00:00:00.000Z',
      completedAt: '2023-01-01T00:00:00.000Z',
    },
    Review: {
      $user: 'User ID (ObjectId)',
      $book: 'Book ID (ObjectId)',
      $rating: 5,
      comment: 'This was an amazing read!',
    },
    UpdateReview: {
      user: 'User ID (ObjectId)',
      book: 'Book ID (ObjectId)',
      rating: 4,
      comment: 'Actually, it was a 4/5 for me.',
    },
  },
}

const outputFile = './docs/swagger-output.json'
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)
