const mongoose = require('mongoose')
const toJsonPlugin = require('../../utils/toJsonPlugin')

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

// Cascade delete: Remove all readlist entries and reviews when user is deleted
userSchema.pre('findByIdAndDelete', async function (next) {
  const userId = this._conditions._id
  const Readlist = mongoose.model('Readlist')
  const Review = mongoose.model('Review')
  await Readlist.deleteMany({ user: userId })
  await Review.deleteMany({ user: userId })
  next()
})

module.exports = userSchema
