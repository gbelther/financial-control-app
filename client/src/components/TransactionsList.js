import React, { useEffect, useState } from 'react';
import Transaction from './Transaction';
import TransactionsResume from './TransactionsResume';
import api from '../api/apiService';

export default function TransactionsList({
  currentTransactions,
  textFilter,
  onChangeCurrentTransactions,
  isModalOpen,
  onChangeModalOpen,
  onChangeTransactionEditing,
}) {
  const [transactionsFiltered, setTransactionsFiltered] = useState([]);

  useEffect(() => {
    const getTransactionsFiltered = () => {
      const transactions = currentTransactions.filter((transaction) => {
        if (!textFilter) {
          return transaction;
        }

        return transaction.description
          .toLowerCase()
          .includes(textFilter.toLowerCase());
      });

      transactions.sort((a, b) => {
        return a.day - b.day;
      });
      setTransactionsFiltered(transactions);
    };

    getTransactionsFiltered();
  }, [currentTransactions, textFilter]);

  const handleDeleteTransaction = (id) => {
    const newTransactionList = currentTransactions.filter(
      (transaction) => transaction._id !== id
    );
    setTransactionsFiltered(newTransactionList);
    api.deleteTransaction(id);

    onChangeCurrentTransactions(newTransactionList);
  };

  const handleEditTransaction = (transactionEditing) => {
    onChangeTransactionEditing(transactionEditing);
    onChangeModalOpen(true);
  };

  return (
    <div>
      <TransactionsResume transactionsFiltered={transactionsFiltered} />

      {transactionsFiltered.map((transaction) => {
        let provisionalId = transactionsFiltered.indexOf(transaction);
        if (!transaction._id) {
          transaction._id = provisionalId;
        }

        return (
          <Transaction
            key={transaction._id}
            id={transaction._id}
            transaction={transaction}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleEditTransaction}
          />
        );
      })}
    </div>
  );
}
