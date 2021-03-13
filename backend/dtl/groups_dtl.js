const _ = require('underscore');

function getAllGroupsDto(data) {
  const { invitedGroups, acceptedGroups } = data;
  const invitedGroupsDto = _.map(invitedGroups, (group) => {
    const { id, name } = group;
    return { id, name };
  });
  const acceptedGroupsDto = _.map(acceptedGroups, (group) => {
    const { id, name } = group;
    return { id, name };
  });
  const result = { acceptedGroups: acceptedGroupsDto, invitedGroups: invitedGroupsDto };
  return result;
}

function getBasicGroupDetails(data) {
  const { id, name, acceptedUsers, invitedUsers, currency } = data;
  return { id, name, acceptedUsers, invitedUsers, currency };
}

module.exports = {
  getAllGroupsDto,
  getBasicGroupDetails,
};
