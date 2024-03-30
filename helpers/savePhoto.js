const fs = require('fs/promises')
const path = require('path')
const sharp = require('sharp')
const randomstring = require('randomstring')
const { UPLOADS_DIR } = require('../config')
require('dotenv').config()

async function savePhoto (photo, width) {
  const uploadsPath = path.resolve(__dirname, '../', UPLOADS_DIR)

  try {
    await fs.access(uploadsPath)
  } catch (error) {
    await fs.mkdir(uploadsPath)
  }

  try {
    const imageName = randomstring.generate({ length: 15 }) + path.extname(photo.name)
    const imagePath = path.join(uploadsPath, imageName)

    await sharp(photo.data).resize(width).toFile(imagePath)

    return imageName
  } catch (error) {
    console.error(error)
    throw new Error('Error al guardar la foto.')
  }
}

module.exports = savePhoto
