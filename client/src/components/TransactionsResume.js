import React from 'react';
import { setFormatMoney } from '../helpers/formatHelpers';

export default function TransactionsResume({ transactionsFiltered }) {
  function revenueSum() {
    const revenue = transactionsFiltered.reduce((acc, curr) => {
      if (curr.type === '+') {
        acc += curr.value;
      }
      return acc;
    }, 0);

    return revenue;
  }

  function expenditureSum() {
    const expenditure = transactionsFiltered.reduce((acc, curr) => {
      if (curr.type === '-') {
        acc += curr.value;
      }
      return acc;
    }, 0);

    return expenditure;
  }

  return (
    <div style={styles.resumeContainer}>
      <div>Lançamentos: {transactionsFiltered.length} </div>
      <div>Receitas: {setFormatMoney(revenueSum())} </div>
      <div>Despesas: {setFormatMoney(expenditureSum())} </div>
      <div>Saldo: {setFormatMoney(revenueSum() - expenditureSum())}</div>
    </div>
  );
}

const styles = {
  resumeContainer: {
    display: 'flex',
    flexDirection: 'row',
    padding: '10px',
    border: '1px solid black',
    borderRadius: '5px',
    justifyContent: 'space-between',
    margin: '20px 0',
  },
};
