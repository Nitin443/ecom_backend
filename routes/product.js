const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const {createProduct} = require('../controllers/product');

router.post('/create', isAuth, createProduct);

module.exports = router;

