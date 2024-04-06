const getPool = require('../../DB/ConnectionDB.JS')

async function getAllAnimals (req, res, next) {
  let arrayPhotos = []
  try {
    const pool = await getPool()

    const [animals] = await pool.query(`
    SELECT 
      animal.id, 
      animal.name, 
      animal.species, 
      animal.age, 
      animal.gender,
    GROUP_CONCAT(animal_images.photo_id) AS photo_urls
    FROM 
    animal
    LEFT JOIN 
      animal_images ON animal.id = animal_images.animal_id
    GROUP BY 
      animal.id, 
      animal.name, 
      animal.species, 
      animal.age, 
      animal.gender;
    `)

    for (const animal of animals) {
      arrayPhotos = animal.photo_urls.split(',')
      animal.photo_urls = arrayPhotos
    }

    res.status(200).json({
      status: 'ok',
      message: 'Datos de todos los animales',
      data: animals
    })
  } catch (error) {
    res.status(500).send('Error interno del servidor')
  }
}

module.exports = getAllAnimals
