const logger = require('../utils/logger').getLogger();
const _ = require('underscore');
const genericDTL = require('../dtl/generic');
const groupsRepo = require('../repos/groups_repo');
const usersRepo = require('../repos/user_repo');
const expensesRepo = require('../repos/expenses_repo');
const expensesDtl = require('../dtl/expenses_dtl');

function getNameById(data, id) {
  const value = data.find(entry => entry.id == id);
  return value ? value.name : undefined;
}

async function getBalanceByUser2Id(req, res, next) {
  try {
    logger.info('controllers', 'getBalanceByUser2Id');
    const { userId } = req.user;
    const { user2Id } = req.params;
    const user = await usersRepo.getUserById(user2Id);
    if (!user) return res.send(genericDTL.getResponseDto('', 'User not found'));
    const { balance } = await expensesRepo.getBalanceBetweenUsers(userId, user2Id);
    const response = genericDTL.getResponseDto({ balance });
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to get balance between users. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function getAllExpenses(req, res, next) {
  try {
    logger.info('controllers', 'getAllExpenses');
    const { userId } = req.user;
    const { getExpenses, payExpenses } = await expensesRepo.getAllExpensesForUserId(userId);
    const users = await usersRepo.getAllUsers();
    const allGroups = await groupsRepo.getAllGroups();
    const data = await expensesDtl.getExpenseSummaryDto({ getExpenses, payExpenses, userId, users, allGroups });
    const response = genericDTL.getResponseDto(data);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to get all expenses. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function getRecentExpenses(req, res, next) {
  try {
    logger.info('controllers', 'getRecentExpenses');
    const { userId } = req.user;
    const { acceptedGroups } = await groupsRepo.getAllGroupsByUserId(userId);
    const groups = await groupsRepo.getAllGroups();
    const users = await usersRepo.getAllUsers();
    const expenses = [];
    await Promise.all(acceptedGroups.map(async (group) => {
      const groupId = group.id;
      const temp = await expensesRepo.getAllExpensesByGroupId(groupId, userId);
      expenses.push(...temp);
    }));
    const data = expensesDtl.getRecentExpensesDto({ users, groups, userId, expenses });
    const response = genericDTL.getResponseDto(data);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to get recent expenses. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function createGroupExpense(req, res, next) {
  try {
    logger.info('controllers', 'createGroupExpense', 'body', JSON.stringify(req.body));
    const { userId } = req.user;
    const { groupId, amount, description } = req.body;
    const group = await groupsRepo.getGroupById(groupId);
    if (!group || !group.acceptedUsers.length) return res.send(genericDTL.getResponseDto('', 'Group not found'));
    const userIds = group.acceptedUsers;
    const { currency } = group;
    const expenses = await expensesRepo.createGroupExpense({ userId, userIds, groupId, amount, description, currency });
    const resData = expensesDtl.getBasicExpensesDetailsDto(expenses);
    const response = genericDTL.getResponseDto(resData);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to create expense. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function getAllExpensesForGroup(req, res, next) {
  try {
    logger.info('controllers', 'getAllExpensesForGroup', 'params', JSON.stringify(req.params));
    const { groupId } = req.params;
    const expenses = await expensesRepo.getAllExpensesForGroup(groupId);
    const response = genericDTL.getResponseDto(expenses);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to settle expense. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

async function getBalanceBetweenAllUsersForGroup(req, res, next) {
  try {
    logger.info('controllers', 'getBalanceBetweenAllUsersForGroup', 'params', JSON.stringify(req.params));
    const { groupId } = req.params;
    const users = await groupsRepo.getAllAcceptedUsersByGroupId(groupId);
    const balances = [];
    const allUsers = await usersRepo.getAllUsers();
    for (let i = 0; i < users.length; i += 1) {
      for (let j = i + 1; j < users.length; j += 1) {
        const byUser = users[i];
        const toUser = users[j];
        const { balance } = await expensesRepo.getBalanceBetweenUsers(byUser, toUser);
        const byUserName = getNameById(allUsers, byUser);
        const toUserName = getNameById(allUsers, toUser);
        balances.push({ byUserName, toUserName, balance });
      }
    }
    const response = genericDTL.getResponseDto(balances);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to settle expense. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}


async function settleExpense(req, res, next) {
  try {
    logger.info('controllers', 'settleExpense', 'params', JSON.stringify(req.params));
    const { userId } = req.user;
    const { user2Id } = req.params;
    const updatedDetails = await expensesRepo.settleAllBalancesBetweenUsers(userId, user2Id);
    const response = genericDTL.getResponseDto(updatedDetails);
    return res.send(response);
  } catch (err) {
    logger.error(`Unable to settle expense. Err. ${JSON.stringify(err)}`);
    return next(err);
  }
}

module.exports = {
  getBalanceByUser2Id,
  getAllExpenses,
  getAllExpensesForGroup,
  createGroupExpense,
  getBalanceBetweenAllUsersForGroup,
  getRecentExpenses,
  settleExpense,
};
