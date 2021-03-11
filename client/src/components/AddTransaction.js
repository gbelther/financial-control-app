import React from 'react';

export default function AddTransaction({ onChangeModalOpen }) {
  const handleModalOpen = () => {
    onChangeModalOpen(true);
  };

  return (
    <div style={styles.addContainer}>
      <button style={styles.button} onClick={handleModalOpen}>
        Adicionar
      </button>
    </div>
  );
}

const styles = {
  addContainer: {
    width: '20%',
    height: '30px',
    padding: '0 20px 0 0',
  },
  button: {
    width: '100%',
    height: '100%',
  },
};
