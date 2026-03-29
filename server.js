const express = require('express')
const cors = require('cors')
const rootRouter = require('./routes')
const { connect } = require('./database')
const { morganMiddleware } = require('./middlewares/morganMiddleware')
const {
  unknownEndpoint,
  errorHandler,
} = require('./middlewares/errorMiddleware')
require('dotenv').config()

/* eslint-disable no-console */
process.on('uncaughtException', err => {
  console.error('UNCAUGHT EXCEPTION:', err)
  process.exit(1)
})

const app = express()
const port = process.env.PORT || 3030
let server

app.use(cors())
app.use(morganMiddleware)
app.use(express.json())

app.use('/', rootRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

const initServer = async () => {
  await connect()
  server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

process.on('unhandledRejection', err => {
  console.error('UNHANDLED REJECTION:', err)
  if (server) server.close(() => process.exit(1))
  else process.exit(1)
})

module.exports = { initServer }
