const getPool = require('../../DB/ConnectionDB.js')
const idSchema = require('../../schemas/idSchmea.js')

async function getUser (req, res, next) {
  const { error: errorId } = await idSchema.validateAsync(req.params.id)

  if (errorId) {
    res.status(400).send('Introduce un id valido')
  }

  const id = req.params.id
  console.log(id)
  const pool = await getPool()

  try {
    const [user] = await pool.query('SELECT user_name, user_surname, avatar, email, is_admin FROM user WHERE user_id = ?', [id])

    res.status(200).json({
      status: 'ok',
      message: 'Datos del usuario',
      data: user
    })
  } catch (error) {
    res.status(500).send('Error en el servidor')
  }
}

module.exports = getUser
