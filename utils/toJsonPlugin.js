const toJsonPlugin = schema => {
  schema.set('toJSON', {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
      delete returnedObject.passwordHash
    },
  })
}

module.exports = toJsonPlugin
