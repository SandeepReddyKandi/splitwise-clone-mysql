const express = require('express');
const expenseController = require('../controllers/expense_controller');
const { isLoggedIn } = require('../middlewares/auth_middleware');

const router = express.Router();

router.get('/all', isLoggedIn, expenseController.getAllExpenses);
router.get('/details/:expenseId', isLoggedIn, expenseController.getExpenseDetails);
router.get('/recent', isLoggedIn, expenseController.fetchRecentExpenses);
router.post('/create', isLoggedIn, expenseController.createExpense);
router.post('/settle/:expenseId', isLoggedIn, expenseController.settleExpense);

module.exports = router;
