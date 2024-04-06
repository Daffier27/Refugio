const express = require('express')
const animalsRouter = express.Router()
const getAllAnimals = require('../controllers/animalControllers/getAllAnimals')
const getAnimal = require('../controllers/animalControllers/getAnimal')

animalsRouter.get('/getAllAnimals', getAllAnimals)
animalsRouter.get('/getAnimal/:id', getAnimal)

module.exports = animalsRouter
