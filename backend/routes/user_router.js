const express = require('express');
const userController = require('../controllers/user_controller');
const { isLoggedIn } = require('../middlewares/auth_middleware');

const router = express.Router();

router.post('/login', userController.loginUser);
router.post('/signup', userController.signUpUser);
router.get('/balance', isLoggedIn, userController.fetchBalance);
router.put('/update', isLoggedIn, userController.updateUserDetails);

module.exports = router;
