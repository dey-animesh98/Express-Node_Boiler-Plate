const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
// const helmet = require('helmet')
require('dotenv').config()

const app = express()
const route = require('./Routers/routes');
const PORT = process.env.PORT || 3000

// app.use(helmet())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(multer().any())
app.use('/', route);


mongoose.connect(process.env.CONNECT_MONGODB, { useNewUrlParser: true })

    .then(() => console.log("MongoDB is Connected"))
    .catch((err) => console.log(`${err.message}`))

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

