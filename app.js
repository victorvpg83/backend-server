// Requires
require('dotenv').config()
const path = require('path')

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

// Public path
app.use( express.static('public') )

// Routes
app.use('/api/users', require('./routes/user.routes') )
app.use('/api/login', require('./routes/auth.routes') )
app.use('/api/hospitals', require('./routes/hospital.routes') )
app.use('/api/doctors', require('./routes/doctor.routes') )
app.use('/api/all', require('./routes/search.routes') )
app.use('/api/upload', require('./routes/upload.routes') )
app.use('/', require('./routes/app.routes') )

app.get( '*', (req, res) =>{
    res.sendFile( path.resolve( __dirname, 'public/index.html' ) )
})

// express listening
app.listen( process.env.PORT, () => console.log(`Express corriendo en el puerto:` + process.env.PORT ) )