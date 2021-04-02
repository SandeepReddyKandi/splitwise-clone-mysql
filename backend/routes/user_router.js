const express = require('express');
const multer = require('multer');
const path = require('path');
const userController = require('../controllers/user_controller');
const { isLoggedIn } = require('../middlewares/auth_middleware');

const router = express.Router();

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/images/',
    filename(req, file, cb) {
      cb(null, `${req.user.userId}${path.extname(file.originalname)}`);
    },
    limits: { fileSize: 1000000 },
  }),
}).single('image');

router.post('/login', userController.loginUser);
router.post('/signup', userController.signUpUser);
router.put('/update', isLoggedIn, upload, userController.updateUserDetails);
router.get('/all', isLoggedIn, userController.getAllUsers);
router.post('/me', isLoggedIn, userController.getUserDetails);

module.exports = router;
