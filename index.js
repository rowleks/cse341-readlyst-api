const { initServer } = require('./server')

/* eslint-disable no-console */
const main = async () => {
  try {
    await initServer()
  } catch (err) {
    console.error(err)
  }
}

main()
