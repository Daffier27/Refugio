const getPool = require('../../DB/ConnectionDB.js')
const animalSchema = require('../../schemas/createAnimalSchema.js')
const photoSchema = require('../../schemas/photoSchema.js')
const { v4: uuidv4 } = require('uuid')
const savePhoto = require('../../helpers/savePhoto.js')

async function createAnimal (req, res, next) {
  try {
    const { error: animalError } = await animalSchema.validateAsync(req.body)
    if (animalError) {
      return res.status(400).send('Error al crear el animal')
    }

    const animalImages = req.files?.animalImages

    if (!animalImages || animalImages.length === 0) {
      return res.status(400).send('Se requiere al menos una imagen para el animal')
    }

    const { name, age, gender, speciesId, breedId } = req.body
    console.log(req.body)
    const animalId = uuidv4()

    const pool = await getPool()

    await pool.query(
      'INSERT INTO animal (id, name, age, gender, species_id, breed_id) VALUES (?, ?, ?, ?, ?, ?)',
      [animalId, name, age, gender, speciesId, breedId]
    )

    for (const photo of animalImages) {
      const { error: photoError } = await photoSchema.validateAsync(photo)
      if (photoError) {
        return res.status(400).send('Error en la foto: ' + photoError.message)
      }

      const photoId = await savePhoto(photo)
      await pool.query(
        'INSERT INTO animal_images (photo_id, animal_id) VALUES (?, ?)',
        [photoId, animalId]
      )
    }

    res.status(201).send('Animal creado exitosamente')
  } catch (error) {
    console.error('Error al crear el animal:', error)
    res.status(500).send('Fallo interno del servidor')
  }
}

module.exports = createAnimal
