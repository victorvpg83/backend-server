// Requires
const express = require('express')
const mongoose = require('mongoose')

// init vars
const app = express()

// Connect to DB

const connectDb = async() => {
    try {
       await mongoose.connect('mongodb://localhost:27017/hospital',{
           useNewUrlParser: true,
           useUnifiedTopology: true,
           useFindAndModify:false
       })
       console.log('MongoDB conectada: \x1b[32m%s\x1b[0m','Escuchando') 
    } catch (error) {
        console.log(error)
        process.exit(1) // stop app
    }
}

connectDb()

// Routes
app.get( '/', ( req, res, next ) => {
    res.status(200).json({
        ok: true,
        message: 'Petición realizada correctamente'
    })
})


// express listening
app.listen( 3000, () => console.log('Express server en el puerto 3000: \x1b[32m%s\x1b[0m','Escuchando') )