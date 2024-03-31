const logInSchema = require('../schemas/logInSchema.js')
const getPool = require('../DB/ConnectionDB.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { JWT_EXPIRATION, JWT_COOKIE_EXPIRES, JWT_TOKEN } = require('../config.js')

async function logIn (req, res) {
  try {
    const { error: logInError } = await logInSchema.validateAsync(req.body)
    if (logInError) {
      return res.status(400).send('Error al introducir las credenciales')
    }

    const { email, password } = req.body
    const pool = await getPool()

    const [user] = await pool.query('SELECT email, user_id, password FROM user WHERE email = ?', [email])
    if (user.length === 0) {
      return res.status(400).send('Error al introducir las credenciales')
    }

    const hashedPassword = user[0].password
    const passwordMatch = await bcrypt.compare(password, hashedPassword)
    if (!passwordMatch) {
      return res.status(400).send('Error al introducir las credenciales')
    }

    const token = jwt.sign(
      { user: user.user_id },
      JWT_TOKEN,
      { expiresIn: JWT_EXPIRATION }
    )
    console.log(JWT_COOKIE_EXPIRES)
    const cookieOptions = {
      expires: new Date(Date.now() + JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
      path: '/'
      // httpOnly: true,
      // secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
      // sameSite: 'Strict'
    }

    res.cookie('jwt', token, cookieOptions)
    res.status(201).json({
      status: 'ok',
      message: 'Usuario loggeado',
      data: user[0]
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error en el servidor')
  }
}

module.exports = logIn
