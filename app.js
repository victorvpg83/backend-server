// Requires
require('dotenv').config()

const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')

// create server
const app = express()

// CORS config
app.use( cors() )

// Read and parse body
app.use( express.json() )

// Connect to DB
dbConnection()

// Routes
app.use('/api/users', require('./routes/user.routes') )
app.use('/api/login', require('./routes/auth.routes') )
app.use('/', require('./routes/app.routes') )

// express listening
app.listen( process.env.PORT, () => console.log(`Express corriendo en el puerto:` + process.env.PORT ) )