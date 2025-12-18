const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

const createTransaction = async (req, res) => {
  try {
    console.log('Backend: Creating transaction with data:', req.body);
    
    const transactionId = 'TXN' + Date.now() + Math.floor(Math.random() * 1000);
    
    const transactionData = {
      ...req.body,
      transactionId,
      userId: req.body.userId ? new mongoose.Types.ObjectId(req.body.userId) : null
    };
    
    console.log('Backend: Final transaction data:', transactionData);
    
    const transaction = await Transaction.create(transactionData);
    
    console.log('Backend: Transaction created successfully:', transaction);

    res.status(201).json({
      success: true,
      transaction,
      transactionId
    });
  } catch (error) {
    console.error('Backend: Error creating transaction:', error);
    res.status(400).json({ success: false, message: error.message });
  }
};

const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find()
      .populate('userId', 'username email')
      .populate('planId', 'planName')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, transactions });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getUserTransactions = async (req, res) => {
  try {
    const { mobile } = req.params;
    const { userId } = req.query;
    
    console.log('Backend: getUserTransactions called with:', { mobile, userId });
    
    let query = { mobile };
    if (userId) {
      try {
        query.userId = new mongoose.Types.ObjectId(userId);
      } catch (err) {
        console.error('Backend: Invalid userId format:', userId);
        return res.status(400).json({ success: false, message: 'Invalid user ID format' });
      }
    }
    
    console.log('Backend: Query:', query);
    
    const transactions = await Transaction.find(query)
      .populate('planId', 'planName')
      .sort({ createdAt: -1 });
    
    console.log('Backend: Found transactions:', transactions.length);
    console.log('Backend: Transactions:', transactions);
    
    res.json({ success: true, transactions });
  } catch (error) {
    console.error('Backend: Error in getUserTransactions:', error);
    res.status(500).json({ message: error.message });
  }
};

const getAllTransactionsDebug = async (req, res) => {
  try {
    const transactions = await Transaction.find({}).sort({ createdAt: -1 });
    console.log('Debug: All transactions:', transactions);
    res.json({ success: true, count: transactions.length, transactions });
  } catch (error) {
    console.error('Debug: Error fetching all transactions:', error);
    res.status(500).json({ message: error.message });
  }
};

const getUserTransactionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    
    console.log('Backend: getUserTransactionsByUserId called with:', { userId });
    
    let query = { userId: new mongoose.Types.ObjectId(userId) };
    
    console.log('Backend: Query:', query);
    
    const transactions = await Transaction.find(query)
      .populate('planId', 'planName')
      .sort({ createdAt: -1 });
    
    console.log('Backend: Found transactions:', transactions.length);
    
    res.json({ success: true, transactions });
  } catch (error) {
    console.error('Backend: Error in getUserTransactionsByUserId:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createTransaction, getTransactions, getUserTransactions, getAllTransactionsDebug, getUserTransactionsByUserId };