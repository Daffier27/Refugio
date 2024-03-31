const express = require('express')
const userRouter = express.Router()
const authentication = require('../controllers/signUp.js')
const logIn = require('../controllers/logIn.js')
const editUser = require('../controllers/editUser.js')
const getUser = require('../controllers/getUser.js')
const verifyToken = require('../middlewares/verifyToken.js')

userRouter.get('/getUser/:id', /* verifyToken, */getUser)
userRouter.post('/signUp', authentication)
userRouter.post('/logIn', logIn)
userRouter.post('editUser', verifyToken, editUser)

module.exports = userRouter
