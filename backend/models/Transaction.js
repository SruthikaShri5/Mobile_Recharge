const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  mobile: {
    type: String,
    required: true,
    match: /^[0-9]{10}$/
  },
  operator: {
    type: String,
    required: true
  },
  planId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Plan',
    required: false
  },
  planName: {
    type: String,
    required: true
  },
  planType: {
    type: String,
    enum: ['topup', 'data', 'prepaid', 'postpaid'],
    required: true
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  validity: {
    type: String,
    required: true
  },
  data: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'success'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Transaction', transactionSchema);