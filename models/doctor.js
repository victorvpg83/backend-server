const mongoose = require('mongoose')

const Schema = mongoose.Schema

const doctorSchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    img: { 
        type: String, 
        required: false 
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }
})

doctorSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject()
    return object
})


module.exports = mongoose.model( 'Doctor', doctorSchema )