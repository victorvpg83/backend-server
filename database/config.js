const mongoose = require('mongoose')

const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })
        console.log('DB Online') 
     } catch (error) {
         console.log(error)
         process.exit(1) // stop app
     }
}

module.exports = { dbConnection }