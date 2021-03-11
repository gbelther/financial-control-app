const mongoose = require('mongoose');

let schema = mongoose.Schema({
  description: {
    type: String,
    require: true,
  },
  value: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  year: {
    type: Number,
    require: true,
  },
  month: {
    type: Number,
    require: true,
  },
  day: {
    type: Number,
    require: true,
  },
  yearMonth: {
    type: String,
    require: true,
  },
  yearMonthDay: {
    type: String,
    require: true,
  },
  type: {
    type: String,
    require: true,
  },
}, {
  versionKey: false,
});

const TransactionModel = mongoose.model('transactions', schema, 'transactions');

module.exports = TransactionModel;
