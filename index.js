const express = require('express')
const app = express()
const SERVER_PORT = 4000

app.get('/', (req, res) => res.json())

app.listen(SERVER_PORT, () => {
  console.log(`Server is listening on port ${SERVER_PORT}`)
})
