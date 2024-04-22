const express = require('express')
const appointmentRouter = express.Router()
const getAllAppointments = require('../controllers/appointmentControllers/getAllAppointments.js')
const getAppointment = require('../controllers/appointmentControllers/getAppointment.js')
const createNewAppointment = require('../controllers/appointmentControllers/createNewAppointment.js')
const deleteAppointment = require('../controllers/appointmentControllers/deleteAppointment.js')

appointmentRouter.get('/getAllappointments', getAllAppointments)
appointmentRouter.get('/getAppointment/:id', getAppointment)
appointmentRouter.post('/createNewAppointment', createNewAppointment)
appointmentRouter.delete('/deleteAppointment/:id', deleteAppointment)

module.exports = appointmentRouter
