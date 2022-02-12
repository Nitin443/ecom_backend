const mongoose = require('mongoose');
//const crypto = require('crypto');
//const uuidv1 = require('uuid/v1');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
    },
    about: {
        type: String,
        trim: true,
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    history: {
        type: Array,
        default: []
    }
}, {timestamps: true});


// hashing of password remain 3(2)

module.exports = mongoose.model('User', userSchema);