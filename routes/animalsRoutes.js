const express = require('express')
const animalsRouter = express.Router()
const getAllAnimals = require('../controllers/animalControllers/getAllAnimals')

animalsRouter.get('/getAllAnimals', getAllAnimals)

module.exports = animalsRouter
