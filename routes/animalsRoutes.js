const express = require('express')
const animalsRouter = express.Router()
const getAllAnimals = require('../controllers/animalControllers/getAllAnimals')
const getAnimal = require('../controllers/animalControllers/getAnimal')
const createAnimal = require('../controllers/animalControllers/createAnimal.js')
const deleteAnimal = require('../controllers/animalControllers/deleteAnimal.js')
const verifyToken = require('../middlewares/verifyToken.js')
const isAdmin = require('../middlewares/isAdmin.js')

animalsRouter.get('/getAllAnimals', getAllAnimals)
animalsRouter.get('/getAnimal/:id', getAnimal)
animalsRouter.post('/createAnimal', verifyToken, isAdmin, createAnimal)
animalsRouter.delete('/deleteAnimal/:id', verifyToken, isAdmin, deleteAnimal)

module.exports = animalsRouter
