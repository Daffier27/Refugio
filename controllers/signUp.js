const getPool = require('../DB/ConnectionDB.js')
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid')
const savePhoto = require('../helpers/savePhoto.js')

const authenticationSchema = require('../schemas/authenticationSchema.js')
const photoSchema = require('../schemas/photoSchema.js')

async function authentication (req, res, next) {
  const { error: errorUser } = authenticationSchema.validate(req.body)
  if (req.files?.avatar) {
    const { error: errorPhoto } = photoSchema.validate(req.files?.avatar)
    if (errorPhoto) {
      res.status(400).send('Error en la foto: ' + errorPhoto.message)
      return
    }
  }

  if (errorUser) {
    res.status(400).send('Bad Request')
    return
  }

  const { name, surname, email, password } = req.body
  let avatarString

  if (req.files?.avatar) {
    if (Array.isArray(req.files.avatar)) {
      res.status(400).send('No puedes subir más de una foto.')
      return
    }
    avatarString = await savePhoto(req.files.avatar, 150)
  }

  if (!name || !surname || !email || !password) {
    res.status(400).send('Bad Request')
    return
  }

  const hashedPassword = await bcrypt.hash(password, 8)
  const userId = uuidv4()
  const pool = await getPool()

  try {
    const [result] = await pool.query('SELECT id FROM user WHERE email = ?', [email])

    if (result.length !== 0) {
      res.status(409).send('El usuario ya ha sido registrado.')
      return
    }

    await pool.query(`
      INSERT INTO user (id, name, surname, email, password, avatar)
      VALUES (?, ?, ?, ?, ?, ?)
    `, [userId, name, surname, email, hashedPassword, avatarString])

    res.status(200).json({
      status: 200,
      message: 'El registro se ha realizado con éxito.'
    })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error en el servidor.')
  }
}

module.exports = authentication
