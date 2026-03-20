const express = require('express')
const cors = require('cors')
const rootRouter = require('./routes')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use('/', rootRouter)

/* eslint-disable no-console */
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
