const express = require('express');
const expenseController = require('../controllers/expense_controller');
const { isLoggedIn } = require('../middlewares/auth_middleware');

const router = express.Router();

router.get('/all', isLoggedIn, expenseController.getAllExpenses);
router.get('/balance/:user2Id', isLoggedIn, expenseController.getBalanceByUser2Id);
router.post('/create', isLoggedIn, expenseController.createGroupExpense);
router.get('/recent', isLoggedIn, expenseController.getRecentExpenses);
router.put('/settle/:user2Id', isLoggedIn, expenseController.settleExpense);
router.get('/all-group/:groupId', isLoggedIn, expenseController.getAllExpensesForGroup);

module.exports = router;
