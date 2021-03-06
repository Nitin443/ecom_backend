const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const {createProduct, getProduct, updateProduct, deleteProduct, getProductById, getList, getRelatedCategoryProduct, searchProduct, listSearch} = require('../controllers/product');

router.post('/create', isAuth, createProduct);
router.get('/get', getProduct);
router.get('/get/:productId', getProductById);
router.put('/update/:productId', isAuth, updateProduct);
router.delete('/delete/:productId', isAuth, deleteProduct);
//get list of product based on query
router.get('/list', getList);
// get related category product
router.get('/relatedCategory/:productId', getRelatedCategoryProduct);
// search product
router.post('/search', searchProduct);
// this api for search product list[search bar]
router.post('/listSearch', listSearch);

module.exports = router;

