const express = require('express');
const friendsController = require('../controllers/friends_controller');
const { isLoggedIn } = require('../middlewares/auth_middleware');

const router = express.Router();

router.get('/all', isLoggedIn, friendsController.getAllFriends);
router.put('/:friendshipId/details', isLoggedIn, friendsController.getFriendDetails);
router.get('/create', isLoggedIn, friendsController.createFriend);
router.get('/delete', isLoggedIn, friendsController.deleteFriend);

module.exports = router;
