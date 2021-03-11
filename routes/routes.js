const express = require('express');
const transaction = require('../services/transactionService.js');
const transactionRouter = express.Router();

transactionRouter.post('/', function (req, res) {
  transaction.setNewTransaction(req, res);
});

transactionRouter.delete('/:id', function (req, res) {
  transaction.deleteTransaction(req, res);
});

transactionRouter.put('/:id', function (req, res) {
  transaction.updateTransaction(req, res);
});

transactionRouter.get('/', function (req, res) {
  transaction.filterTransaction(req, res);
});

transactionRouter.get('/getAll', function (req, res) {
  transaction.getAllTransaction(req, res);
});

module.exports = transactionRouter;
