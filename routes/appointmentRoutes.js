const express = require('express')
const appointmentRouter = express.Router()
const getAllAppointments = require('../controllers/appointmentControllers/getAllAppointments.js')
const getAppointment = require('../controllers/appointmentControllers/getAppointment.js')
const createNewAppointment = require('../controllers/appointmentControllers/createNewAppointment.js')
const deleteAppointment = require('../controllers/appointmentControllers/deleteAppointment.js')
const verifyToken = require('../middlewares/verifyToken.js')

appointmentRouter.get('/getAllappointments', verifyToken, getAllAppointments)
appointmentRouter.get('/getAppointment/:id', verifyToken, getAppointment)
appointmentRouter.post('/createNewAppointment', verifyToken, createNewAppointment)
appointmentRouter.delete('/deleteAppointment/:id', verifyToken, deleteAppointment)

module.exports = appointmentRouter
