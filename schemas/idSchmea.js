const Joi = require('joi')

const schema = Joi.string().guid({ version: 'uuidv4' })

module.exports = schema
