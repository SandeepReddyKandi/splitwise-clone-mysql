const _ = require('underscore');
const db = require('../models/index');

const { expenses } = db;
const { Op } = db.Sequelize;

function getTotalAmount(allExpenses) {
  let total = 0;
  if (!allExpenses) return total;
  allExpenses.forEach((expense) => {
    total += expense.amount;
    return expense;
  });
  return total;
}

async function getBalanceBetweenUsers(user1Id, user2Id) {
  const getCondition = { plain: true, where: { byUser: user1Id, toUser: user2Id, settledAt: null } };
  const payCondition = { plain: true, where: { byUser: user2Id, toUser: user1Id, settledAt: null } };
  const getExpenses = await expenses.findAll(getCondition);
  const payExpenses = await expenses.findAll(payCondition);
  const getAmount = getTotalAmount(getExpenses);
  const payAmount = getTotalAmount(payExpenses);
  const balance = getAmount - payAmount;
  return { getAmount, payAmount, balance };
}

async function settleAllBalancesBetweenUsers(byUser, toUser) {
  const values = { settledAt: Date.now() };
  const condition = { returning: true, plain: true, where: { [Op.or]: [{ byUser, toUser }, { byUser: toUser, toUser: byUser }] } };
  const result = await expenses.update(values, condition);
  return result;
}

async function getAllExpensesForUserId(userId) {
  const getCondition = { plain: true, where: { byUser: userId, settledAt: null } };
  const payCondition = { plain: true, where: { toUser: userId, settledAt: null } };
  const getExpenses = await expenses.findAll(getCondition);
  const payExpenses = await expenses.findAll(payCondition);
  return { getExpenses, payExpenses };
}

async function createGroupExpense(data) {
  const { userId, userIds, groupId, amount, description, currency } = data;
  const amountPerUser = amount / (userIds.length);
  const result = await Promise.all(_.map(userIds, async (toUserId) => {
    if (userId != toUserId) {
      const newExpenseData = { byUser: userId, toUser: toUserId, amount: amountPerUser, description, groupId, currency };
      const newExpense = await expenses.create(newExpenseData);
      return newExpense;
    }
  }));
  return result;
}

async function getAllExpensesByGroupId(groupId, userId) {
  const condition = { where: { [Op.or]: [{ byUser: userId, groupId }, { toUser: userId, groupId }] } };
  const result = await expenses.findAll(condition);
  return result;
}

async function getAllExpensesForGroup(groupId) {
  const result = await expenses.findAll({ where: { groupId } });
  // return result.toJSON();
  return JSON.stringify(result);
}

async function getGroupExpenseForUserId(groupId, userId) {
  const condition = { plain: true, where: { [Op.or]: [{ byUser: userId, groupId }, { toUser: userId, groupId }] } };
  const result = await expenses.findAll(condition);
  return result;
}

module.exports = {
  getBalanceBetweenUsers,
  settleAllBalancesBetweenUsers,
  getAllExpensesForUserId,
  createGroupExpense,
  getAllExpensesByGroupId,
  getAllExpensesForGroup,
  getGroupExpenseForUserId,
};
