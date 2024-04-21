const Joi = require('joi')

const appointmentSchema = Joi.object({
  userId: Joi.string().max(50).required().messages({
    'string.empty': 'El ID del usuario no puede estar vacío',
    'string.max': 'El ID del usuario no puede tener más de {#limit} caracteres',
    'any.required': 'El ID del usuario es obligatorio'
  }),
  appointmentTime: Joi.date().min(new Date()).required().messages({
    'date.base': 'La fecha debe ser válida.',
    'date.min': 'La fecha debe ser posterior a la fecha actual.'
  })
})

module.exports = appointmentSchema
