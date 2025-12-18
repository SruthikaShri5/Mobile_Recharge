const express = require('express');
const { createTransaction, getTransactions, getUserTransactions, getAllTransactionsDebug, getUserTransactionsByUserId } = require('../controllers/transactionController');
const { auth, adminAuth } = require('../middleware/auth');

const router = express.Router();

router.post('/', createTransaction);
router.get('/', auth, adminAuth, getTransactions);
router.get('/mobile/:mobile', getUserTransactions);
router.get('/debug/all', getAllTransactionsDebug);
router.get('/user/:userId', getUserTransactionsByUserId);

module.exports = router;