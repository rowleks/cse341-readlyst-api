const router = require('express').Router()
const booksRoute = require('./booksRoute')
const usersRoute = require('./usersRoute')
const readlistRoute = require('./readlistRoute')
const reviewRoute = require('./reviewRoute')
const authRoute = require('./authRoute')
const { authenticate } = require('../middlewares/auth')

router.get('/', (_, res) => {
  res.send('Hello from the root route!')
})
router.use('/', require('./swagger'))

router.use('/auth', authRoute)
router.use('/books', booksRoute)
router.use('/readlist', authenticate, readlistRoute)
router.use('/reviews', reviewRoute)
router.use('/users', usersRoute)

module.exports = router
