const passport = require('passport')
const userService = require('../services/userService')
const authService = require('../services/authService')

const register = async (req, res) => {
  const { name, username, email, password } = req.body

  const existingUser = await userService.getUserByEmail(email)
  if (existingUser) {
    return res.status(400).json({ message: 'Email already registered' })
  }

  const user = await userService.createUser({
    name,
    username,
    email,
    password,
  })
  const token = authService.generateToken(user)

  res.status(201).json({ user, token })
}

const login = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return next(err)
    }
    if (!user) {
      return res
        .status(401)
        .json({ message: info?.message || 'Authentication failed' })
    }
    const token = authService.generateToken(user)
    res.json({ user, token })
  })(req, res, next)
}

const googleAuth = passport.authenticate('google', {
  scope: ['profile', 'email'],
})

const googleCallback = (req, res, next) => {
  passport.authenticate('google', { session: false }, (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: 'Google auth failed' })
    }
    const token = authService.generateToken(user)

    res.status(200).json({ token, user })

    //TODO: Redirect to frontend with token instead of sending JSON response
    // res.redirect(`${frontendUrl}/auth/success?token=${token}`)
  })(req, res, next)
}

const me = (req, res) => {
  res.json(req.user)
}

module.exports = {
  register,
  login,
  googleAuth,
  googleCallback,
  me,
}
