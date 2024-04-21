const getPool = require('../../DB/ConnectionDB.js')
const appointmentSchema = require('../../schemas/createAppointmentSchema.js')
const { v4: uuidv4 } = require('uuid')

async function createNewAppointment (req, res, next) {
  try {
    const { error: appointmentError } = await appointmentSchema.validateAsync(req.body)

    if (appointmentError) {
      return res.status(400).send('Error al crear la cita.')
    }

    const { userId, appointmentTime } = req.body
    const pool = await getPool()

    const [existingAppointments] = await pool.query('SELECT COUNT(*) AS count FROM appointment WHERE appointmentTime = ? AND status != "Cancelada"', [appointmentTime])
    const appointmentCount = existingAppointments[0].count

    if (appointmentCount >= 3) {
      return res.status(400).send('Ya hay 3 citas programadas para esta fecha y hora.')
    }

    const appointmentId = await uuidv4()
    await pool.query('INSERT INTO appointment (appointment_id, user_id, appointmentTime, status) VALUES (?, ?, ?, ?)', [appointmentId, userId, appointmentTime, 'Pendiente'])

    res.status(201).send('Cita creada exitosamente')
  } catch (error) {
    console.error(error)
    res.status(500).send('Error interno del servidor.')
  }
}

module.exports = createNewAppointment
