const express = require('express')
const userRouter = express.Router()
const authentication = require('../controllers/signUp.js')
const logIn = require('../controllers/logIn.js')

userRouter.post('/signUp', authentication)
userRouter.post('/logIn', logIn)

module.exports = userRouter
