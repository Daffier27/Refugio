const Joi = require('joi')

const schema = Joi.object({
  email: Joi.string().email().max(100).required().messages({
    'string.empty': 'El email no puede estar vacío',
    'string.email': 'El email no es válido',
    'string.max': 'El email no puede tener más de 100 caracteres',
    'any.required': 'El email es obligatorio'
  }),
  password: Joi.string().required()
})

module.exports = schema
