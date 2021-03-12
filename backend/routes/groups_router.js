const express = require('express');
const groupsController = require('../controllers/group_controller');
const { isLoggedIn } = require('../middlewares/auth_middleware');

const router = express.Router();

router.get('/all', isLoggedIn, groupsController.getAllGroups);
router.put('/accept-invite/:groupId', isLoggedIn, groupsController.acceptGroupInvite);
router.get('/search', isLoggedIn, groupsController.searchGroups);
router.get('/group-details', isLoggedIn, groupsController.getGroupDetails);
router.post('/create', isLoggedIn, groupsController.createGroup);
router.put('/delete', isLoggedIn, groupsController.deleteGroup);
router.post('/add-user', isLoggedIn, groupsController.addUserToGroup);
router.post('/remove-user', isLoggedIn, groupsController.removeUserFromGroup);

module.exports = router;
