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

function getExpenseSummaryDto(data) {
  const { getExpenses, payExpenses, userId, users, allGroups } = data;
  let totalcost = 0, pay = 0, recieve = 0;
  const doneRecieveUsers = [];
  const donePayUsers = [];
  const recieveExpensesFinal = [];
  const payExpensesFinal = [];
  for (let i = 0; i < getExpenses.length; i += 1) {
    if (!doneRecieveUsers.includes(getExpenses[i].toUser) && getExpenses[i].toUser != userId) {
      let totalAmount = 0;
      const toUserId = getExpenses[i].toUser;
      const groups = {};
      for (let j = i; j < getExpenses.length; j += 1) {
        if (getExpenses[j].toUser == toUserId) {
          const { groupId } = getExpenses[j];
          totalAmount += getExpenses[j].amount;
          if (groups[groupId]) groups[groupId] += getExpenses[j].amount;
          else groups[groupId] = getExpenses[j].amount;
        }
      }
      const name = getNameById(users, toUserId);
      const tempGroups = [];
      Object.keys(groups).forEach((id) => {
        const obj = {};
        obj.id = id;
        obj.amt = groups[id];
        obj.group = getNameById(allGroups, id);
        tempGroups.push(obj);
      });
      const myObject = {};
      myObject.name = name;
      myObject.id = toUserId;
      myObject.totalAmt = totalAmount;
      recieve += totalAmount;
      myObject.groups = tempGroups;
      doneRecieveUsers.push(getExpenses[i].toUser);
      recieveExpensesFinal.push(myObject);
    }
  }
  for (let i = 0; i < payExpenses.length; i += 1) {
    if (!donePayUsers.includes(payExpenses[i].byUser) && payExpenses[i].byUser != userId) {
      let totalAmount = 0;
      const byUserId = payExpenses[i].byUser;
      const groups = {};
      for (let j = i; j < payExpenses.length; j += 1) {
        if (payExpenses[j].byUser == byUserId) {
          const { groupId } = payExpenses[j];
          totalAmount += payExpenses[j].amount;
          if (groups[groupId]) groups[groupId] += payExpenses[j].amount;
          else groups[groupId] = payExpenses[j].amount;
        }
      }
      const name = getNameById(users, byUserId);
      const tempGroups = [];
      Object.keys(groups).forEach((id) => {
        const obj = {};
        obj.id = id;
        obj.amt = groups[id];
        obj.group = getNameById(allGroups, id);
        tempGroups.push(obj);
      });
      const myObject = {};
      myObject.name = name;
      myObject.id = byUserId;
      myObject.totalAmt = totalAmount;
      pay += totalAmount;
      myObject.groups = tempGroups;
      donePayUsers.push(payExpenses[i].byUser);
      payExpensesFinal.push(myObject);
    }
  }
  const result = {};
  totalcost = recieve-pay;
  result.totalcost = totalcost;
  result.pay = pay;
  result.recieve = recieve;
  result.recieveExpenses = recieveExpensesFinal;
  result.getExpenses = payExpensesFinal;
  return result;
}

module.exports = {
  getRecentExpensesDto,
  getExpenseSummaryDto,
};
