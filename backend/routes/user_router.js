const express = require('express');
const userController = require('../controllers/user_controller');
const { isLoggedIn } = require('../middlewares/auth_middleware');

const router = express.Router();

router.post('/login', userController.loginUser);
router.post('/signup', userController.signUpUser);
router.put('/update', isLoggedIn, userController.updateUserDetails);
router.get('/all', isLoggedIn, userController.getAllUsers);
router.post('/me', isLoggedIn, userController.getUserDetails);

module.exports = router;
