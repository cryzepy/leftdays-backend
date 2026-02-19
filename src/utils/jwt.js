const jwt = require('jsonwebtoken')

exports.generateAppToken = (user) => {
  return jwt.sign(
    { id: user.googleId, email: user.email },
    process.env.JWT_SECRET,
  )
}

exports.decodeAppToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (err) {
        return null
    }
}
