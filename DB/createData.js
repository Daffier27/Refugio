const getPool = require('./ConnectionDB.js')

async function insertTestData () {
  const pool = await getPool()

  // Inserciones de datos de prueba
  // Inserción de usuarios
  await pool.query(`
    INSERT INTO user (id, name, surname, email, password, avatar, is_admin)
    VALUES
      ('11111111-1111-1111-1111-111111111111', 'John', 'Doe', 'john@example.com', 'password123', 'avatar1.jpg', false),
      ('22222222-2222-2222-2222-222222222222', 'Jane', 'Smith', 'jane@example.com', 'password456', 'avatar2.jpg', false),
      ('33333333-3333-3333-3333-333333333333', 'Alice', 'Johnson', 'alice@example.com', 'password789', 'avatar3.jpg', false);
  `)

  // Inserción de especies
  await pool.query(`
    INSERT INTO species (id, name)
    VALUES
      ('44444444-4444-4444-4444-444444444444', 'Dog'),
      ('55555555-5555-5555-5555-555555555555', 'Cat'),
      ('66666666-6666-6666-6666-666666666666', 'Bird');
  `)

  // Inserción de razas
  await pool.query(`
    INSERT INTO breeds (id, species_id, name)
    VALUES
      ('77777777-7777-7777-7777-777777777777', '44444444-4444-4444-4444-444444444444', 'Labrador'),
      ('88888888-8888-8888-8888-888888888888', '55555555-5555-5555-5555-555555555555', 'Poodle'),
      ('99999999-9999-9999-9999-999999999999', '66666666-6666-6666-6666-666666666666', 'Siamese');
  `)

  // Inserción de animales
  await pool.query(`
    INSERT INTO animal (id, name, species, age, gender, species_id, breed_id)
    VALUES
      ('aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'Max', 'Dog', 3, 'M', '44444444-4444-4444-4444-444444444444', '77777777-7777-7777-7777-777777777777'),
      ('bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', 'Fluffy', 'Cat', 2, 'F', '55555555-5555-5555-5555-555555555555', '88888888-8888-8888-8888-888888888888'),
      ('cccccccc-cccc-cccc-cccc-cccccccccccc', 'Charlie', 'Dog', 5, 'M', '44444444-4444-4444-4444-444444444444', '77777777-7777-7777-7777-777777777777');
  `)

  // Inserción de imágenes de animales
  await pool.query(`
    INSERT INTO animal_images (photo_id, animal_id)
    VALUES
      ('dddddddd-dddd-dddd-dddd-dddddddddddd', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa'),
      ('eeeeeeee-eeee-eeee-eeee-eeeeeeeeeeee', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb'),
      ('ffffffff-ffff-ffff-ffff-ffffffffffff', 'cccccccc-cccc-cccc-cccc-cccccccccccc');
  `)

  // Inserción de citas
  await pool.query(`
  INSERT INTO appointment (appointment_id, user_id, appointmentTime, status)
  VALUES
    ('11111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', '2024-04-17 10:00:00', 'Pendiente'),
    ('22222222-2222-2222-2222-222222222222', '22222222-2222-2222-2222-222222222222', '2024-04-18 11:00:00', 'Completada'),
    ('33333333-3333-3333-3333-333333333333', '33333333-3333-3333-3333-333333333333', '2024-04-19 09:00:00', 'Pendiente');

  `)

  // Inserción de adopciones
  await pool.query(`
    INSERT INTO adoption (adoption_id, user_id, animal_id, adoptionDate, adoptionFEE)
    VALUES
      ('44444444-4444-4444-4444-444444444444', '11111111-1111-1111-1111-111111111111', 'aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', '2024-04-20', 100.00),
      ('55555555-5555-5555-5555-555555555555', '22222222-2222-2222-2222-222222222222', 'bbbbbbbb-bbbb-bbbb-bbbb-bbbbbbbbbbbb', '2024-04-21', 75.00),
      ('66666666-6666-6666-6666-666666666666', '33333333-3333-3333-3333-333333333333', 'cccccccc-cccc-cccc-cccc-cccccccccccc', '2024-04-22', 120.00);
  `)

  console.log('Datos de prueba insertados exitosamente.')
  process.exit(0)
}

insertTestData()
