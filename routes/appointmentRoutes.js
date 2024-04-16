const express = require('express')
const appointmentRouter = express.Router()
const getAllAppointments = require('../controllers/appointmentControllers/getAllAppointments.js')
const getAppointment = require('../controllers/appointmentControllers/getAppointment.js')

appointmentRouter.get('/getAllappointments', getAllAppointments)
appointmentRouter.get('/getAppointment/:id', getAppointment)

module.exports = appointmentRouter
