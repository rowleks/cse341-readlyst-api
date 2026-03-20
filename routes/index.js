const router = require('express').Router()
const books = require('./books')
const users = require('./users')

router.get('/', (_, res) => {
  res.send('Hello from the root route!')
})

router.use('/books', books)
router.use('/users', users)

module.exports = router
