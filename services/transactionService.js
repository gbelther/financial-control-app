// import mongoose from 'mongoose';
const mongoose = require('mongoose');
const dataHelpers = require('../helpers/dateHelpers');

const ObjectId = mongoose.Types.ObjectId;

// Aqui havia um erro difícil de pegar. Importei como "transactionModel",
// com "t" minúsculo. No Windows, isso não faz diferença. Mas como no Heroku
// o servidor é Linux, isso faz diferença. Gastei umas boas horas tentando
// descobrir esse erro :-/
const TransactionModel = require('../models/TransactionModel.js');

const setNewTransaction = async (req, res) => {
  try {
    const transaction = await TransactionModel.insertMany(req.body);

    res.send(transaction);
  } catch (error) {
    res.send(error);
  }
};

const deleteTransaction = async (req, res) => {
  const id = req.params.id;

  try {
    const transaction = await TransactionModel.findByIdAndDelete(id);

    res.send(transaction);
  } catch (error) {
    res.send(error);
  }
};

const updateTransaction = async (req, res) => {
  const id = req.params.id;

  try {
    await TransactionModel.findByIdAndUpdate({ _id: id }, req.body);

    res.send('Atualizado com Sucesso!');
  } catch (error) {
    res.send(error);
  }
};

const filterTransaction = async (req, res) => {
  const { query } = req;

  try {
    if (!query.period) {
      throw new Error(
        'É necessário informar o parâmetro mês/ano no formato /?period=aaaa-mm'
      );
    }

    const { period } = query;
    dataHelpers.validatePeriod(period);

    const transactions = await TransactionModel.find({
      yearMonth: period,
    });

    res.send({
      length: transactions.length,
      transactions: transactions,
    });
  } catch ({ message }) {
    console.log(message);
    res.status(400).send({ error: message });
  }
};

const getAllTransaction = async (req, res) => {
  try {
    const allTransaction = await TransactionModel.find({});

    res.send(allTransaction);
  } catch ({ message }) {
    console.log(message);
    res.status(400).send({ error: message });
  }
};

module.exports = {
  setNewTransaction,
  deleteTransaction,
  updateTransaction,
  filterTransaction,
  getAllTransaction,
};
