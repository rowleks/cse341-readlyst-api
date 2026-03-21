const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'Readlyst API docs',
    description: 'API documentation for the endpoints',
  },
  host: 'cse341-readlyst-api.onrender.com',
  schemes: ['https'],
}

const outputFile = './docs/swagger-output.json'
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)
