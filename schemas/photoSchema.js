const Joi = require('joi')

const photoSchema = Joi.object({
  name: Joi.string().required(),
  data: Joi.any().required(),
  size: Joi.number().required(),
  encoding: Joi.string(),
  tempFilePath: Joi.any(),
  truncated: Joi.boolean(),
  mimetype: Joi.string().valid('image/jpg', 'image/jpeg', 'image/png', 'image/webp'),
  md5: Joi.string(),
  mv: Joi.func()
}).messages({

})

module.exports = photoSchema
