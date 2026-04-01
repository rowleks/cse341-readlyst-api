const passport = require('passport')
const userService = require('../services/userService')
const authService = require('../services/authService')

const register = async (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Register a new user'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Registration data',
      schema: { $ref: '#/definitions/User' }
  } */
  try {
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
  } catch (err) {
    next(err)
  }
}

const login = (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Login with email and password'
  /* #swagger.parameters['body'] = {
      in: 'body',
      description: 'Login credentials',
      schema: {
        $email: 'john@example.com',
        $password: 'secret123'
      }
  } */
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

const googleAuth = (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Initiate Google OAuth authentication'
  passport.authenticate('google', {
    scope: ['profile', 'email'],
  })(req, res, next)
}

const googleCallback = (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Google OAuth callback'
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

const me = (req, res, next) => {
  // #swagger.tags = ['Auth']
  // #swagger.summary = 'Get current authenticated user profile'
  try {
    res.json(req.user)
  } catch (err) {
    next(err)
  }
}

module.exports = {
  register,
  login,
  googleAuth,
  googleCallback,
  me,
}
