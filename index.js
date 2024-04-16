require('dotenv').config()
const express = require('express')
const app = express()
const userRouter = require('./routes/usersRoutes')
const animalsRouter = require('./routes/animalsRoutes.js')
const appointmentRouter = require('./routes/appointmentRoutes.js')
const { SERVER_PORT } = require('./config.js')
const fileUpload = require('express-fileupload')
const cors = require('cors')

app.use(cors())
app.use('/uploads', express.static('uploads'))
app.use(express.urlencoded({ extended: false, limit: '10mb' }))
app.use(express.json({ limit: '10mb' }))
app.use(fileUpload())

app.use('/user', userRouter)
app.use('/animal', animalsRouter)
app.use('/appointment', appointmentRouter)

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`)
})
