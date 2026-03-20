const router = require('express').Router()

router.get('/', (_, res) => {
  res.send('Hello from the root route!')
})

module.exports = router
