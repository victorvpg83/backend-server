const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    email: { 
        type: String, 
        unique: true, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    img: { 
        type: String, 
        required: false 
    },
    role: { 
        type: String, 
        required: true, 
        default: 'USER_ROLE', 
    },
    google:{ 
        type: Boolean, 
        default: false 
    }
})

userSchema.method('toJSON', function() {
    const { __v, _id, password, ...object } = this.toObject()
    object.uid = _id
    return object
})


module.exports = mongoose.model( 'User', userSchema )
