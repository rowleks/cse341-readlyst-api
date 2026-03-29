const morgan = require('morgan')

const morganMiddleware = morgan(
  ':date[web] :method :url :status :res[content-length] - :response-time ms'
)

module.exports = { morganMiddleware }
