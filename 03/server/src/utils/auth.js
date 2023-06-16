const jwt = require('jsonwebtoken')
const User = require('../api/user/user.model')

const authenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers
    if (!authorization) {
      throw new Error('The sesion has expired by athorization')
    }
    const [_, token] = authorization.split(' ')
    if (!token) {
      throw new Error('The sesion has expired by token')
    }
    const { id } = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.user = id
    const user = await User.findById(req.user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }
    next()
  } catch (err) {
    res.status(401).json({ message: err.message })
  }
}

module.exports = { authenticate }
