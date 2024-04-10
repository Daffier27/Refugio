const fs = require('fs/promises')
const path = require('path')
const { UPLOADS_DIR } = require('../config')

async function deletePhoto (photoString) {
  const uploadsPath = path.resolve(__dirname, '../', UPLOADS_DIR, photoString)

  try {
    await fs.unlink(uploadsPath)
  } catch (error) {
    console.log(error)
  }
}

module.exports = deletePhoto
