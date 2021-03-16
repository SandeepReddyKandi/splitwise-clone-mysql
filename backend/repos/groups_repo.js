const db = require('../models/index');
const _ = require('underscore');

const { groups } = db;
const { Op } = db.Sequelize;

async function findGroupByName(name) {
  const condition = name ? { name: { [Op.like]: `%${name}%` } } : null;
  const result = await groups.findOne({ where: condition });
  return result;
}

async function getAllGroups() {
  const result = await groups.findAll();
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
  const newInvitedUsers = _.filter(groupData.invitedUsers, user => user !== userId);
  const newAcceptedUsers = [...groupData.acceptedUsers, userId];
  const values = { acceptedUsers: newAcceptedUsers, invitedUsers: newInvitedUsers };
  const condition = { returning: true, plain: true, where: { id: groupId } };
  const result = await groups.update(values, condition);
  return result;
}

async function createGroup(data) {
  const { name, userId, invitedUsers, currency } = data;
  const invitedUsersFinal = invitedUsers || [];
  const group = { name, invitedUsers: invitedUsersFinal, acceptedUsers: [userId], currency };
  const result = await groups.create(group);
  return result;
}

async function leaveGroup(userId, groupId) {
  const groupData = await groups.findOne({ where: { id: groupId } });
  if (!groupData) throw new Error('Invalid group id');
  const newAcceptedUsers = _.filter(groupData.acceptedUsers, user => user !== userId);
  const values = { acceptedUsers: newAcceptedUsers };
  if (newAcceptedUsers.length === 0 && groupData.invitedUsers.length === 0) {
    const result = await groups.destroy({ where: { id: groupId } });
    return result;
  }
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
  const group = await groups.findOne({ plain: true, where: { id: groupId } });
  const result = group.acceptedUsers;
  return result;
}

module.exports = {
  getAllGroups,
  getAllGroupsByUserId,
  getGroupById,
  acceptGroupInvite,
  createGroup,
  leaveGroup,
  findGroupByName,
  updateGroupDetails,
  getAllAcceptedUsersByGroupId,
};
