const express = require('express')
const userRouter = express.Router()
const authentication = require('../controllers/userControllers/signUp.js')
const logIn = require('../controllers/userControllers/logIn.js')
const editUser = require('../controllers/userControllers/editUser.js')
const getUser = require('../controllers/userControllers/getUser.js')
const verifyToken = require('../middlewares/verifyToken.js')

userRouter.get('/getUser/:id', verifyToken, getUser)
userRouter.post('/signUp', authentication)
userRouter.post('/logIn', logIn)
userRouter.post('editUser', verifyToken, editUser)

module.exports = userRouter
