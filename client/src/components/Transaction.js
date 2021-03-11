import React from 'react';
import { setFormatMoney } from '../helpers/formatHelpers';

export default function Transaction({
  transaction,
  onDeleteTransaction,
  onEditTransaction,
}) {
  const onClickDelete = () => {
    onDeleteTransaction(transaction._id);
  };

  const onClickEdit = () => {
    onEditTransaction(transaction);
  };

  return (
    <div style={styles.transactionContainer}>
      <div style={styles.dayAndInfo}>
        <div style={styles.day}>{transaction.day}</div>
        <div>
          <p style={{ fontWeight: 'bold' }}>{transaction.category}</p>
          <p>{transaction.description}</p>
        </div>
      </div>
      <div style={styles.valueAndIcons}>
        <div style={styles.value}>
          <p>{setFormatMoney(transaction.value)}</p>
        </div>
        <div style={styles.icons}>
          <i
            className="material-icons"
            style={styles.icons}
            onClick={onClickEdit}
          >
            edit
          </i>
          <i
            className="material-icons"
            style={styles.icons}
            onClick={onClickDelete}
          >
            delete
          </i>
        </div>
      </div>
    </div>
  );
}

const styles = {
  transactionContainer: {
    border: '1px solid black',
    borderRadius: '5px',
    margin: '5px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dayAndInfo: {
    display: 'flex',
    flexDirection: 'row',
  },
  day: {
    display: 'flex',
    alignItems: 'center',
    padding: '5px 20px',
  },
  valueAndIcons: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '10px',
  },
  value: {
    padding: '0 120px 0 0',
  },
  icons: {
    cursor: 'pointer',
    margin: '3px',
  },
};
