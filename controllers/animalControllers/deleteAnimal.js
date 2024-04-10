const getPool = require('../../DB/ConnectionDB.js')
const deletePhoto = require('../../helpers/deletePhoto.js')

async function deleteAnimal (req, res, next) {
  const id = req.params.id

  try {
    const pool = await getPool()
    const imageString = await pool.query(`
      SELECT photo_id FROM animal_images WHERE animal_id = ?
    `, [id])
    await pool.query(`
    DELETE FROM animal_images WHERE = ?
    `, [id])
    await pool.query(`
      DELETE FROM animal WHERE ?
    `, [id])
    await deletePhoto(imageString)

    res.status(200).send({
      status: 'ok',
      message: 'Animal eliminado correctamente'
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error interno del servidor')
  }
}

module.exports = deleteAnimal
