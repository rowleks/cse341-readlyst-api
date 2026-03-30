const LocalStrategy = require('passport-local').Strategy
const GoogleStrategy = require('passport-google-oauth20').Strategy
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt')

const { jwtSecret, google } = require('./auth')
const userService = require('../services/userService')

const localStrategy = new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await userService.getUserByEmail(email)
      if (!user) {
        return done(null, false, { message: 'Invalid email or password' })
      }
      const isValid = await userService.validatePassword(user, password)
      if (!isValid) {
        return done(null, false, { message: 'Invalid email or password' })
      }
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
)

const googleStrategy = new GoogleStrategy(
  {
    clientID: google.clientID,
    clientSecret: google.clientSecret,
    callbackURL: google.callbackURL,
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      const user = await userService.createOrUpdateGoogleUser({
        name: profile.displayName,
        email: profile.emails[0].value,
        googleId: profile.id,
        avatar: profile.photos[0]?.value,
      })
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  }
)

const jwtOpts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtSecret,
}

const jwtStrategy = new JwtStrategy(jwtOpts, async (payload, done) => {
  try {
    const user = await userService.getUserById(payload.id)
    if (!user) {
      return done(null, false)
    }
    return done(null, user)
  } catch (err) {
    return done(err, false)
  }
})

module.exports = passport => {
  passport.use(localStrategy)
  passport.use(googleStrategy)
  passport.use(jwtStrategy)
}
