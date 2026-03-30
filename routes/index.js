const router = require('express').Router()
const booksRoute = require('./booksRoute')
const usersRoute = require('./usersRoute')
const readlistRoute = require('./readlistRoute')
const reviewRoute = require('./reviewRoute')
const authRoute = require('./authRoute')

router.get('/', (_, res) => {
  res.send('Hello from the root route!')
})
router.use('/', require('./swagger'))

router.use('/books', booksRoute)
router.use('/users', usersRoute)
router.use('/readlist', readlistRoute)
router.use('/reviews', reviewRoute)
router.use('/auth', authRoute)

module.exports = router
