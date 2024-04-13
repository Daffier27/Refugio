const getPool = require('../../DB/ConnectionDB.js')

async function getAllAppointments (req, res, next) {
  try {
    const pool = await getPool()

    const currentDate = new Date().toISOString()

    const appointments = await pool.query(`
      SELECT appointment_id, user_id, appointmentTime
      FROM appointment
      WHERE appointmentTime > ? 
      ORDER BY appointmentTime ASC
    `, [currentDate])

    res.json(appointments)
  } catch (error) {
    console.error('Error al obtener las citas:', error)
    res.status(500).send('Error interno del servidor.')
  }
}

module.exports = getAllAppointments
