const getPool = require('./ConnectionDB.js')

function createDB () {
  const pool = getPool()

  // Crear la base de datos Refugio
  pool.query('DROP DATABASE IF EXISTS Refugio', (err) => {
    if (err) {
      console.error('Error al borrar la base de datos:', err)
      return
    }

    pool.query('CREATE DATABASE Refugio', (err) => {
      if (err) {
        console.error('Error al crear la base de datos:', err)
        return
      }

      console.log('Base de datos Refugio creada.')

      // Usar la base de datos Refugio
      pool.query('USE Refugio', (err) => {
        if (err) {
          console.error('Error al usar la base de datos:', err)
          return
        }

        console.log('Usando la base de datos Refugio.')

        // Crear las tablas
        const createTablesQuery = `
                    CREATE TABLE user (
                        id VARCHAR(50) PRIMARY KEY,
                        name VARCHAR(50) NOT NULL,
                        surname VARCHAR(50) NOT NULL,
                        email VARCHAR(50) NOT NULL UNIQUE,
                        password VARCHAR(100) NOT NULL,
                        avatar VARCHAR(50),
                        is_admin BOOLEAN DEFAULT(FALSE)
                    );

                    CREATE TABLE species (
                        id VARCHAR(50) PRIMARY KEY,
                        name VARCHAR(50) NOT NULL
                    );

                    CREATE TABLE breeds (
                        id VARCHAR(50) PRIMARY KEY,
                        species_id VARCHAR(50) NOT NULL,
                        name VARCHAR(50) NOT NULL,
                        FOREIGN KEY (species_id) REFERENCES species(id)
                    );

                    CREATE TABLE animal (
                        id VARCHAR(50) PRIMARY KEY,
                        name VARCHAR(50) NOT NULL,
                        species VARCHAR(50) NOT NULL,
                        age INTEGER DEFAULT(0),
                        gender ENUM("H", "M"),
                        species_id VARCHAR(50),
                        breed_id VARCHAR(50),
                        FOREIGN KEY (species_id) REFERENCES species(id),
                        FOREIGN KEY (breed_id) REFERENCES breeds(id)
                    );

                    CREATE TABLE animal_images (
                        photo_id VARCHAR(50) PRIMARY KEY,
                        animal_id VARCHAR(50),
                        FOREIGN KEY (animal_id) REFERENCES animal(id)
                    );

                    CREATE TABLE appointment (
                        appointment_id VARCHAR(50) PRIMARY KEY,
                        user_id VARCHAR(50),
                        animal_id VARCHAR(50) NOT NULL,
                        appointmentTime DATETIME,
                        status VARCHAR(20),
                        FOREIGN KEY (user_id) REFERENCES user(id),
                        FOREIGN KEY (animal_id) REFERENCES animal(id)
                    );

                    CREATE TABLE adoption (
                        adoption_id VARCHAR(50) PRIMARY KEY,
                        user_id VARCHAR(50),
                        animal_id VARCHAR(50),
                        adoptionDate DATE,
                        adoptionFEE DECIMAL(10,2),
                        FOREIGN KEY (user_id) REFERENCES user(id),
                        FOREIGN KEY (animal_id) REFERENCES animal(id)
                    );
                `

        pool.query(createTablesQuery, (err) => {
          if (err) {
            console.error('Error al crear las tablas:', err)
            return
          }

          console.log('Tablas creadas exitosamente.')
        })
      })
    })
  })
}

module.exports = createDB
