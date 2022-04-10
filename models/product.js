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
    sold: {
        type: Number,
        default: 0
    },
    imgUrl: {
        type: String,
    },
    shippy: {
        type: Boolean,
    },
    url: {
        type: String
    }
}, {timestamps: true});

module.exports = mongoose.model('Product', productSchema);