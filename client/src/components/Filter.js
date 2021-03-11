import React from 'react';

export default function Filter({ onChangeTextFilter }) {
  const handleChangeText = (event) => {
    onChangeTextFilter(event.target.value);
  };

  return (
    <div style={styles.input}>
      <input type="text" placeholder="Filtrar" onChange={handleChangeText} />
    </div>
  );
}

const styles = {
  input: {
    width: '80%',
  },
};
