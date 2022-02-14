const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const {create} = require('../controllers/category');

router.post('/create', isAuth, create);

module.exports =  router;