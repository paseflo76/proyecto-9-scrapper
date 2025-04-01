require('dotenv').config()
const { connect } = require('mongoose')
const { scrapper } = require('./src/utils/scrapper')
const express = require('express')
const { connectDB } = require('./src/config/db')
const gamesRouter = require('./src/api/routes/game')

const app = express()
app.use(express.json())
connectDB()
app.use('/api/v1/games', gamesRouter)

app.use('*', (req, res, next) => {
  return res.status(404).json('route not fount')
})

app.listen(3000, () => {
  console.log('conectado a http:localhost:3000')
})
/* scrapper('https://www.dlcompare.es/juegos?platform=ps5') */
