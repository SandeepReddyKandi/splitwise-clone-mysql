const logger = require('../utils/logger').getLogger();
const _ = require('underscore');
const genericDTL = require('../dtl/generic');
const groupsDtl = require('../dtl/groups_dtl');
const groupsRepo = require('../repos/groups_repo');
const expensesRepo = require('../repos/expenses_repo');

async function getAllGroups(req, res, next) {
  try {
    logger.info('controllers', 'getAllGroups');
    const { userId } = req.user;
    const groups = await groupsRepo.getAllGroupsByUserId(userId);
    const data = groupsDtl.getAllGroupsDto(groups);
    const response = genericDTL.getResponseDto(data);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to get all groups. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function acceptGroupInvite(req, res, next) {
  try {
    logger.info('controllers', 'acceptGroupInvite');
    const { userId } = req.user;
    const { groupId } = req.params;
    await groupsRepo.acceptGroupInvite({ groupId, userId });
    const updatedDetails = await groupsRepo.getGroupById(groupId);
    const data = groupsDtl.getBasicGroupDetails(updatedDetails);
    const response = genericDTL.getResponseDto(data);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to accept group invite. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function createGroup(req, res, next) {
  try {
    logger.info('controllers', 'createGroup');
    const { userId } = req.user;
    const data = req.body;
    const { name, invitedUsers, currency } = data;
    const group = await groupsRepo.findGroupByName(name);
    if (group && !_.isEmpty(group)) return res.send(genericDTL.getResponseDto('', 'Group with this name already exists'));
    const newGroup = await groupsRepo.createGroup({ userId, name, currency, invitedUsers });
    const resData = groupsDtl.getBasicGroupDetails(newGroup);
    const response = genericDTL.getResponseDto(resData);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to create new group. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function leaveGroup(req, res, next) {
  try {
    logger.info('controllers', 'leaveGroup');
    const { userId } = req.user;
    const { groupId } = req.params;
    const groupExpense = await expensesRepo.getGroupExpenseForUserId(groupId, userId); // Implement
    if (groupExpense || !_.isEmpty(groupExpense)) return res.send(genericDTL.getResponseDto('', 'You can not leave group without clearing dues.'));
    await groupsRepo.leaveGroup(userId, groupId);
    const updatedDetails = await groupsRepo.getGroupById(groupId);
    const data = groupsDtl.getBasicGroupDetails(updatedDetails);
    const response = genericDTL.getResponseDto(data);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to leave group. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function updateGroup(req, res, next) {
  try {
    logger.info('controllers', 'updateGroup', 'body', JSON.stringify(req.body));
    const { name, groupId } = req.body;
    await groupsRepo.updateGroupDetails({ groupId, name });
    const updatedDetails = await groupsRepo.getGroupById(groupId);
    const data = groupsDtl.getBasicGroupDetails(updatedDetails);
    const response = genericDTL.getResponseDto(data);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to update user details. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

module.exports = {
  getAllGroups,
  acceptGroupInvite,
  createGroup,
  leaveGroup,
  updateGroup,
};
