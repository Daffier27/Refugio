const getPool = require('../../DB/ConnectionDB')

async function deleteAppointment (req, res, next) {
  try {
    const id = req.params.id
    const pool = await getPool()

    const [result] = await pool.query('DELETE FROM appointment WHERE appointment_id = ?', [id])
    console.log(result)
    if (result.affectedRows === 0) {
      return res.status(404).send('La cita no se encontró en la base de datos')
    }

    res.status(200).send('Cita eliminada exitosamente')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error interno del servidor')
  }
}

module.exports = deleteAppointment
