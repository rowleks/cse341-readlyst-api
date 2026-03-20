const swaggerAutogen = require('swagger-autogen')()

const doc = {
  info: {
    title: 'API docs',
    description: 'API documentation for the endpoints',
  },
  host: 'localhost:3000',
  schemes: ['http'],
}

const outputFile = './docs/swagger-output.json'
const routes = ['./routes/index.js']

swaggerAutogen(outputFile, routes, doc)
