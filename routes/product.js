const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const {createProduct, getProduct, updateProduct, deleteProduct, getProductById, getList} = require('../controllers/product');

router.post('/create', isAuth, createProduct);
router.get('/get', getProduct);
router.get('/get/:productId', getProductById);
router.put('/update/:productId', isAuth, updateProduct);
router.delete('/delete/:productId', isAuth, deleteProduct);
router.get('/list', getList);

module.exports = router;

