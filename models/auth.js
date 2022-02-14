const mongoose = require('mongoose');

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
    role: {
        type: Number,
        default: 0,
        enum: [0, 1]  // 0  for user  // 1 for admin
    },
    history: {
        type: Array,
        default: []
    },
}, {timestamps: true});



module.exports = mongoose.model('User', userSchema);