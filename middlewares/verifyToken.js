const jwt = require('jsonwebtoken')
const { JWT_TOKEN } = require('../config.js')

const verifyToken = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ error: 'Acceso denegado' })
  try {
    const verified = jwt.verify(token, JWT_TOKEN)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ error: 'token no es válido' })
  }
}

module.exports = verifyToken
