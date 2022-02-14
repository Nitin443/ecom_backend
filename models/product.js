const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        maxlength: 32
    },
    description: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        require: true,
        ref: 'Category'
    },
    quantity: {
        type: Number,
        require: true
    },
    imgUrl: {
        type: String,
        require: true
    },
    shippy: {
        type: Boolean,
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);