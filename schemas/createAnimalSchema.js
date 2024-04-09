const Joi = require('joi')

const animalSchema = Joi.object({
  name: Joi.string().max(50).required().messages({
    'string.empty': 'El nombre no puede estar vacío',
    'string.max': 'El nombre no puede tener más de {#limit} caracteres',
    'any.required': 'El nombre es obligatorio'
  }),
  age: Joi.number().integer().min(0).default(0).messages({
    'number.integer': 'La edad debe ser un número entero',
    'number.min': 'La edad no puede ser menor que {#limit}'
  }),
  gender: Joi.string().valid('H', 'M').messages({
    'any.only': 'El género debe ser "H" o "M"'
  }),
  speciesId: Joi.string().max(50).required().messages({
    'string.empty': 'El ID de la especie no puede estar vacío',
    'string.max': 'El ID de la especie no puede tener más de {#limit} caracteres',
    'any.required': 'El ID de la especie es obligatorio'
  }),
  breedId: Joi.string().max(50).required().messages({
    'string.empty': 'El ID de la raza no puede estar vacío',
    'string.max': 'El ID de la raza no puede tener más de {#limit} caracteres',
    'any.required': 'El ID de la raza es obligatorio'
  })
})

module.exports = animalSchema
