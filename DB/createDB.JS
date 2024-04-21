const getPool = require('./ConnectionDB.js')
const { MYSQL_DB_NAME } = require('../config.js')

async function createDB () {
  try {
    const pool = await getPool()

    await pool.query(`CREATE DATABASE IF NOT EXISTS ${MYSQL_DB_NAME}`)
    await pool.query('DROP TABLE IF EXISTS adoption, animal_images, appointment, appointment_slot, animal, breeds, species, user')
    console.log('Base de datos Refugio creada y en uso.')

    await pool.query(`
      CREATE TABLE user (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        surname VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL UNIQUE,
        password VARCHAR(100) NOT NULL,
        avatar VARCHAR(50),
        is_admin BOOLEAN DEFAULT(FALSE)
      )
    `)

    await pool.query(`
      CREATE TABLE species (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(50) NOT NULL
      )
    `)

    await pool.query(`
      CREATE TABLE breeds (
        id VARCHAR(50) PRIMARY KEY,
        species_id VARCHAR(50) NOT NULL,
        name VARCHAR(50) NOT NULL,
        FOREIGN KEY (species_id) REFERENCES species(id)
      )
    `)

    await pool.query(`
      CREATE TABLE animal (
        id VARCHAR(50) PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        species VARCHAR(50) NOT NULL,
        age INTEGER DEFAULT(0),
        gender ENUM("M", "F"),
        species_id VARCHAR(50),
        breed_id VARCHAR(50),
        FOREIGN KEY (species_id) REFERENCES species(id),
        FOREIGN KEY (breed_id) REFERENCES breeds(id)
      )
    `)

    await pool.query(`
      CREATE TABLE animal_images (
        photo_id VARCHAR(50) PRIMARY KEY,
        animal_id VARCHAR(50),
        FOREIGN KEY (animal_id) REFERENCES animal(id)
      )
    `)

    await pool.query(`
    CREATE TABLE appointment (
      appointment_id VARCHAR(50) PRIMARY KEY,
      user_id VARCHAR(50),
      appointmentTime DATETIME, 
      status ENUM('Pendiente', 'Cancelada', 'Completada'),
      slot_id VARCHAR(50),
      FOREIGN KEY (user_id) REFERENCES user(id)
    );
    `)

    await pool.query(`
      CREATE TABLE adoption (
        adoption_id VARCHAR(50) PRIMARY KEY,
        user_id VARCHAR(50),
        animal_id VARCHAR(50),
        adoptionDate DATE,
        adoptionFEE DECIMAL(10,2),
        FOREIGN KEY (user_id) REFERENCES user(id),
        FOREIGN KEY (animal_id) REFERENCES animal(id)
      )
    `)

    console.log('Tablas creadas exitosamente.')
    process.exit(0)
  } catch (error) {
    console.error('Error al crear la base de datos y las tablas:', error)
    process.exit(1)
  }
}

createDB()
