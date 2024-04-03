const getPool = require('../DB/ConnectionDB.js')
const editUserSchema = require('../schemas/editUserSchema.js')
const { savePhoto } = require('../helpers/savePhoto.js')

async function editUser (req, res, next) {
  try {
    const { error: editUserError } = await editUserSchema.validateAsync(req.body)

    if (editUserError) {
      return res.status(400).send('Solicitud de edición de usuario inválida')
    }

    const userData = req.body
    const pool = await getPool()

    let avatarUrl
    if (req.files?.avatar) {
      avatarUrl = await savePhoto(req.files.avatar)
    }

    let sql = 'UPDATE user SET'
    const params = []
    const fields = Object.keys(userData)

    fields.forEach((field, index) => {
      if (field === 'avatar') {
        if (avatarUrl) {
          sql += ` ${field} = ?`
          params.push(avatarUrl)
        }
      } else {
        sql += ` ${field} = ?`
        params.push(userData[field])
      }
      if (index < fields.length - 1) {
        sql += ','
      }
    })

    sql += ' WHERE id = ?'
    params.push(req.params.id)

    const query = await pool.query(sql, params)
    console.log(query)
    res.status(200).json({ message: 'Datos de usuario actualizados correctamente' })
  } catch (error) {
    console.error('Error al editar usuario:', error)
    res.status(500).send('Error interno del servidor')
  }
}

module.exports = editUser
