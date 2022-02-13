const express = require('express');
const router = express.Router();
const isAuth = require('../middleware/isAuth');

const {signup, login, logout} = require('../controllers/auth');


router.post('/signup', signup);
router.post('/login',  login);
router.get('/logout', isAuth, logout);



router.get('/go', isAuth, (req, res) => {
    try {
        return res.status(200).json({ message: 'ok go' });
    } catch (error) {
        return res.status(200).json({ message: 'There is some error' }); 
    }
    
});

module.exports = router;