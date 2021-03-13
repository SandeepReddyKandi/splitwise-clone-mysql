const _ = require('underscore');
const { expenseEnums } = require('../utils/enums');

function getNameById(data, id) {
  const value = data.find(entry => entry.id == id);
  return value.name;
}

function getRecentExpensesDto(data) {
  const { expenses, groups, users, userId } = data;
  const result = [];
  _.map(expenses, (expense) => {
    const {
      byUser, toUser, amount, settledAt, createdAt, groupId, description, currency,
    } = expense;
    const byUserName = getNameById(users, byUser);
    const toUserName = getNameById(users, toUser);
    const groupName = getNameById(groups, groupId);
    if (settledAt) {
      result.push({
        timestamp: settledAt, byUserName: toUserName, toUserName: byUserName, type: expenseEnums.SETTLED, groupName, description, amount, userId, currency,
      });
    }
    result.push({
      timestamp: createdAt, byUserName, toUserName, type: expenseEnums.CREATED, groupName, description, amount, userId, currency,
    });
  });
  const updatedResult = _.sortBy(result, entry => entry.timestamp);
  return updatedResult;
}

module.exports = {
  getRecentExpensesDto,
}