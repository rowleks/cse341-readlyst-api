const passport = require('passport')

const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized' })
    }
    req.user = user
    next()
  })(req, res, next)
}

const requireAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Forbidden: Admin access required' })
  }
  next()
}

const requireOwnership = Model => async (req, res, next) => {
  try {
    const resource = await Model.findById(req.params.id)
    if (!resource) {
      return res.status(404).json({ message: 'Resource not found' })
    }
    const userId = req.user._id?.toString() || req.user.id
    const resourceUserId =
      resource.user?.toString() || resource.userId?.toString()
    const isAdmin = req.user.role === 'admin'
    if (resourceUserId !== userId && !isAdmin) {
      return res
        .status(403)
        .json({ message: 'Forbidden: You can only modify your own resources' })
    }
    req.resource = resource
    next()
  } catch (err) {
    next(err)
  }
}

module.exports = { authenticate, requireAdmin, requireOwnership }
