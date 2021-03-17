const express = require('express');
const groupsController = require('../controllers/group_controller');
const { isLoggedIn } = require('../middlewares/auth_middleware');

const router = express.Router();

router.get('/all', isLoggedIn, groupsController.getAllGroups);
router.get('/:groupId', isLoggedIn, groupsController.getGroupInfo);
router.put('/accept-invite/:groupId', isLoggedIn, groupsController.acceptGroupInvite);
router.post('/create', isLoggedIn, groupsController.createGroup);
router.put('/leave/:groupId', isLoggedIn, groupsController.leaveGroup);
router.put('/update', isLoggedIn, groupsController.updateGroup);

module.exports = router;
