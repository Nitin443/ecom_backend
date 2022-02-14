const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const {createCategory} = require('../controllers/category');

router.post('/create', isAuth, createCategory);

module.exports =  router;