const unknownEndpoint = (_, res) => {
  res.status(404).json({ error: 'Unknown endpoint' })
}

const errorHandler = (err, _, res, __) => {
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Malformatted ID' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  res.status(err.status || 500).json({
    message: err.message,
  })
}

module.exports = { unknownEndpoint, errorHandler }
