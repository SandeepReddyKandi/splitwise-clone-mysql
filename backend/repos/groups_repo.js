const db = require('../models/index');
const _ = require('underscore');

const { groups } = db;
const { Op } = db.Sequelize;

async function findGroupByName(name) {
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  const result = await groups.findOne({ where: condition });
  return result;
}

async function getAllGroupsByUserId(userId) {
  const allGroups = await groups.findAll();
  const invitedGroups = _.filter(allGroups, group => group.invitedUsers.includes(userId));
  const acceptedGroups = _.filter(allGroups, group => group.acceptedUsers.includes(userId));
  const result = { invitedGroups, acceptedGroups };
  return result;
}

async function getGroupById(groupId) {
  const result = await groups.findOne({ where: { id: groupId } });
  return result;
}

async function acceptGroupInvite(data) {
  const { groupId, userId } = data;
  const groupData = await groups.findOne({ where: { id: groupId } });
  if (!groupData) throw new Error('Invalid group id');
  if (groupData.acceptedUsers.includes(userId)) return groupData;
  const newInvitedUsers = _.filter(groupData.invitedUsers, user => user != userId);
  groupData.acceptedUsers.push(userId);
  const values = { acceptedUsers: groupData.acceptedUsers, invitedUsers: newInvitedUsers };
  const condition = { returning: true, plain: true, where: { id: groupId } };
  const result = await groups.update(values, condition);
  return result;
}

async function createGroup(data) {
  const { name, userId, invitedUsers, currency } = data;
  const group = { name, invitedUsers, acceptedUsers: [userId], currency };
  const result = await groups.create(group);
  return result;
}

async function leaveGroup(userId, groupId) {
  const groupData = await groups.findOne({ where: { id: groupId } });
  if (!groupData) throw new Error('Invalid group id');
  const newAcceptedUsers = _.filter(groupData.acceptedUsers, user => user != userId);
  const values = { acceptedUsers: newAcceptedUsers };
  const condition = { returning: true, plain: true, where: { id: groupId } };
  const result = await groups.update(values, condition);
  return result;
}

async function updateGroupDetails(data) {
  const { groupId, name } = data;
  const values = { name };
  const condition = { returning: true, plain: true, where: { id: groupId } };
  const result = await groups.update(values, condition);
  return result;
}

async function getAllAcceptedUsersByGroupId(groupId) {
  const group = await groups.findOne({ where: { id: groupId } });
  const result = group.acceptedUsers;
  return result;
}

module.exports = {
  getAllGroupsByUserId,
  getGroupById,
  acceptGroupInvite,
  createGroup,
  leaveGroup,
  findGroupByName,
  updateGroupDetails,
  getAllAcceptedUsersByGroupId,
};
