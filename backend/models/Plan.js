const mongoose = require('mongoose');

const planSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  price: {
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
  type: {
    type: String,
    enum: ['topup', 'data', 'prepaid', 'postpaid'],
    required: true
  },
  features: {
    type: [String],
    default: []
  },
  operator: {
    type: String,
    default: 'All'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Plan', planSchema);