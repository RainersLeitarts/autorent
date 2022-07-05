const express = require('express')
const app = express()
const mongoose = require('mongoose')
require('dotenv').config()


mongoose.connect(process.env.ATLAS_URL, {useNewUrlParser: true})

const db = mongoose.connection
db.on('error', (err) => console.log(err))
db.on('open', () => console.log('Connection to database succesful'))

app.use(express.json())

const vehiclesRouter = require('./routes/vehicles')
const usersRouter = require('./routes/users')
app.use('/vehicles', vehiclesRouter)
app.use('/users', usersRouter)


app.listen(3000, () => console.log('Listenting on port 3000'))