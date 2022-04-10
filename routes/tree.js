const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const { generateTreeToken}  = require('../controllers/tree');

router.get('/getToken/:userId', isAuth, generateTreeToken);

module.exports = router;