const express = require('express')
const animalsRouter = express.Router()
const getAllAnimals = require('../controllers/animalControllers/getAllAnimals')
const getAnimal = require('../controllers/animalControllers/getAnimal')
const createAnimal = require('../controllers/animalControllers/createAnimal.js')

animalsRouter.get('/getAllAnimals', getAllAnimals)
animalsRouter.get('/getAnimal/:id', getAnimal)
animalsRouter.post('/createAnimal', createAnimal)

module.exports = animalsRouter
