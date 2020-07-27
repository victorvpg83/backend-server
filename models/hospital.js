const mongoose = require('mongoose')

const Schema = mongoose.Schema

const hospitalSchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    img: { 
        type: String, 
        required: false 
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})

hospitalSchema.method('toJSON', function() {
    const { __v, ...object } = this.toObject()
    return object
})


module.exports = mongoose.model( 'Hospital', hospitalSchema )
