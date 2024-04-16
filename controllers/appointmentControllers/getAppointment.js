const getPool = require('../../DB/ConnectionDB.js')

async function getAppointment (req, res, next) {
  const id = req.params.id
  try {
    const pool = await getPool()

    const [query] = await pool.query(`
    SELECT 
    appointment.appointment_id, 
    appointment.user_id, 
    appointment.appointmentTime,
    appointment.status,
    appointment_slot.start_time,
    appointment_slot.end_time,
    appointment_slot.available_slots
FROM 
    appointment
INNER JOIN 
    appointment_slot ON appointment.slot_id = appointment_slot.slot_id
WHERE 
    appointment.appointment_id = ?;
`, [id])

    res.status(200).send(query)
  } catch (error) {
    console.log(error)
    res.status(500).send('Error interno del servidor.')
  }
}

module.exports = getAppointment
