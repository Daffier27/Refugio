const express = require('express')
const userRouter = express.Router()
const authentication = require('../controllers/signUp.js')

userRouter.post('/signUp', authentication)

module.exports = userRouter
