const express = require('express')
const appointmentRouter = express.Router()
const getAllAppointments = require('../controllers/appointmentControllers/getAllAppointments.js')
const getAppointment = require('../controllers/appointmentControllers/getAppointment.js')
const createNewAppointment = require('../controllers/appointmentControllers/createNewAppointment.js')

appointmentRouter.get('/getAllappointments', getAllAppointments)
appointmentRouter.get('/getAppointment/:id', getAppointment)
appointmentRouter.post('/createNewAppointment', createNewAppointment)

module.exports = appointmentRouter
