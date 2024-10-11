const { addExpense, getExpense, deleteExpense } = require('../controllers/expense');
const { addIncome, getIncomes, deleteIncome } = require('../controllers/income');
const {
    addExpenseSplit,
    getExpenseSplits,
    deleteExpenseSplit
} = require('../controllers/expensesplit');

const router = require('express').Router();


router.post('/add-income', addIncome)
    .get('/get-incomes', getIncomes)
    .delete('/delete-income/:id', deleteIncome)
    .post('/add-expense', addExpense)
    .get('/get-expenses', getExpense)
    .delete('/delete-expense/:id', deleteExpense)
    .post('/add-split-expenses' , addExpenseSplit)
    .get('/get-split-expenses' , getExpenseSplits)

module.exports = router