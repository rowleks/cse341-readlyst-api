const mongoose = require('mongoose')
const toJsonPlugin = require('../utils/toJsonPlugin')

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
  },
  { timestamps: true }
)

userSchema.plugin(toJsonPlugin)

const User = mongoose.model('User', userSchema)

module.exports = User
