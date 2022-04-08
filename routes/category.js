const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const {createCategory, getCategoryById, getCategory, updateCategory, deleteCategory }= require('../controllers/category');

router.post('/create', isAuth, createCategory);
router.get('/get/:categoryId', isAuth, getCategoryById);
router.get('/get', getCategory);
router.put('/update/:categoryId', isAuth, updateCategory);
router.delete('/delete/:categoryId', isAuth, deleteCategory);

module.exports =  router;