const express = require('express')
const cors = require('cors')
const rootRouter = require('./routes')
const { connect } = require('./database')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3030

app.use(cors())

app.use('/', rootRouter)

/* eslint-disable no-console */
const initServer = async () => {
  await connect()
  app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
}

module.exports = { initServer }
