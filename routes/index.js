const router = require('express').Router()
const booksRoute = require('./booksRoute')
const usersRoute = require('./usersRoute')

router.get('/', (_, res) => {
  res.send('Hello from the root route!')
})
router.use('/', require('./swagger'))

router.use('/books', booksRoute)
router.use('/users', usersRoute)

module.exports = router
