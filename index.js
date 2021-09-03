require('dotenv').config()
const express = require('express')

const app = express()

const port = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Send email app listening at http://localhost:${port}`)
})