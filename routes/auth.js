const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const {signup, login, logout, userDeatails, updateUserDeatails} = require('../controllers/auth');

router.get('/', (req, res) => {
  res.send("Backend is running");
});
router.post('/signup', signup);
router.post('/login',  login);
router.get('/logout', isAuth, logout);

router.get('/userProfile', isAuth, userDeatails);
router.put('/updateProfile', isAuth, updateUserDeatails);


module.exports = router;


