import React, { useEffect, useState } from 'react';
import api from './api/apiService';
import AddTransaction from './components/AddTransaction';
import Filter from './components/Filter';
import ModalTransaction from './components/ModalTransaction';
import PeriodSelector from './components/PeriodSelector';
import Spinner from './components/Spinner';
import TransactionsList from './components/TransactionsList';
import { today } from './helpers/formatHelpers';

const todayYearMonth = today().slice(0, 7);

export default function App() {
  const [allTransactions, setAllTransactions] = useState([]);
  const [currentTransactions, setCurrentTransactions] = useState([]);
  const [transactionEditing, setTransactionEditing] = useState(null);

  const [allPeriods, setAllPeriods] = useState([]);
  const [currentPeriod, setCurrentPeriod] = useState(todayYearMonth);

  const [textFilter, setTextFilter] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const getAllTransactions = async () => {
      const apiData = await api.getAllTransactions();
      setAllTransactions(apiData.data);
    };

    getAllTransactions();
  }, [currentPeriod, isModalOpen]);

  useEffect(() => {
    const getAllPeriods = () => {
      let periods = [];
      allTransactions.forEach((transaction) => {
        if (!periods.includes(transaction.yearMonth)) {
          periods.push(transaction.yearMonth);
        }
      });
      setAllPeriods(periods);
    };

    getAllPeriods();
  }, [allTransactions]);

  useEffect(() => {
    const getTransactionsFromPeriod = () => {
      const transaction = allTransactions.filter(
        (transaction) => transaction.yearMonth === currentPeriod
      );
      setCurrentTransactions(transaction);
    };

    getTransactionsFromPeriod();
  }, [allTransactions, currentPeriod]);

  const handleChangePeriod = (selectedPeriod) => {
    setCurrentPeriod(selectedPeriod);
  };

  const handleChangeTextFilter = (text) => {
    setTextFilter(text);
  };

  const handleChangeCurrentTransactions = (newCurrentTransaction) => {
    setCurrentTransactions(newCurrentTransaction);
  };

  const handleChangeModalOpen = (resp) => {
    setIsModalOpen(resp);
  };

  const handleSaveModal = async (newTransaction, mode) => {
    console.log(mode);

    const transaction = {
      ...newTransaction,
      year: newTransaction.yearMonthDay.substring(0, 4),
      month: newTransaction.yearMonthDay.substring(5, 7),
      day: newTransaction.yearMonthDay.substring(8, 10),
      yearMonth: newTransaction.yearMonthDay.substring(0, 7),
    };

    if (mode === 'add') {
      const postedTransaction = await api.insertTransaction(transaction);
      let updateTransactions = [...currentTransactions, postedTransaction];

      setCurrentTransactions(updateTransactions);
    } else {
      const editedTransaction = await api.editTransaction(transaction);
      console.log(editedTransaction);
    }

    setTransactionEditing(null);
    setIsModalOpen(false);
  };

  const handleChangeTransactionEditing = (transaction) => {
    setTransactionEditing(transaction);
  };

  const handleNullTransactionEditing = () => {
    setTransactionEditing(null);
  };

  return (
    <div className="container">
      <div>
        <h1>Desafio Final do Bootcamp Full Stack</h1>
      </div>

      {allTransactions.length === 0 && <Spinner>Carregando</Spinner>}

      {allTransactions.length > 0 && (
        <div>
          <PeriodSelector
            allPeriods={allPeriods}
            currentPeriod={currentPeriod}
            onChangePeriod={handleChangePeriod}
          />

          <div style={styles.AddAndFilter}>
            <AddTransaction onChangeModalOpen={handleChangeModalOpen} />
            <Filter onChangeTextFilter={handleChangeTextFilter} />
          </div>

          <TransactionsList
            currentTransactions={currentTransactions}
            textFilter={textFilter}
            onChangeCurrentTransactions={handleChangeCurrentTransactions}
            isModalOpen={isModalOpen}
            onChangeModalOpen={handleChangeModalOpen}
            onChangeTransactionEditing={handleChangeTransactionEditing}
          />
        </div>
      )}

      <ModalTransaction
        isModalOpen={isModalOpen}
        onChangeModalOpen={handleChangeModalOpen}
        onSave={handleSaveModal}
        transactionEditing={transactionEditing}
        onChangeNullTransactionEditing={handleNullTransactionEditing}
      />
    </div>
  );
}

const styles = {
  AddAndFilter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
};
