const Joi = require('joi')

const animalSchema = Joi.object({
  id: Joi.string().max(50).required().messages({
    'string.empty': 'El ID no puede estar vacío',
    'string.max': 'El ID no puede tener más de {#limit} caracteres',
    'any.required': 'El ID es obligatorio'
  }),
  name: Joi.string().max(50).required().messages({
    'string.empty': 'El nombre no puede estar vacío',
    'string.max': 'El nombre no puede tener más de {#limit} caracteres',
    'any.required': 'El nombre es obligatorio'
  }),
  species: Joi.string().max(50).required().messages({
    'string.empty': 'La especie no puede estar vacía',
    'string.max': 'La especie no puede tener más de {#limit} caracteres',
    'any.required': 'La especie es obligatoria'
  }),
  age: Joi.number().integer().min(0).default(0).messages({
    'number.integer': 'La edad debe ser un número entero',
    'number.min': 'La edad no puede ser menor que {#limit}'
  }),
  gender: Joi.string().valid('H', 'M').messages({
    'any.only': 'El género debe ser "H" o "M"'
  }),
  species_id: Joi.string().max(50).required().messages({
    'string.empty': 'El ID de la especie no puede estar vacío',
    'string.max': 'El ID de la especie no puede tener más de {#limit} caracteres',
    'any.required': 'El ID de la especie es obligatorio'
  }),
  breed_id: Joi.string().max(50).required().messages({
    'string.empty': 'El ID de la raza no puede estar vacío',
    'string.max': 'El ID de la raza no puede tener más de {#limit} caracteres',
    'any.required': 'El ID de la raza es obligatorio'
  })
})

module.exports = animalSchema
