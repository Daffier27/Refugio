const getPool = require('../../DB/ConnectionDB.js')

async function getAnimal (req, res, next) {
  const id = req.params.id
  try {
    const pool = await getPool()

    const [[animal]] = await pool.query(`
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
WHERE animal.id = 1
GROUP BY 
    animal.id, 
    animal.name, 
    animal.species, 
    animal.age, 
    animal.gender
    `, [id])

    animal.photo_urls = animal.photo_urls.split(',')

    res.status(200).json({
      status: 'ok',
      message: 'Datos de todos los animales',
      data: animal
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error interno del servidor')
  }
}

module.exports = getAnimal
