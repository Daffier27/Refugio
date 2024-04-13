const express = require('express')
const appointmentRouter = express.Router()
const getAllAppointments = require('../controllers/appointmentControllers/getAllAppointments.js')

appointmentRouter.get('/getAllappointments', getAllAppointments)
module.exports = appointmentRouter
