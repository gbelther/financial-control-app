import React, { useState } from 'react';
import Modal from 'react-modal';
import { today } from '../helpers/formatHelpers.js';

Modal.setAppElement('#root');

export default function ModalTransaction({
  isModalOpen,
  onChangeModalOpen,
  onSave,
}) {
  const [type, setType] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [value, setValue] = useState(0);
  const [date, setDate] = useState(today());

  const handleCloseModal = () => {
    onChangeModalOpen(false);
  };

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategory(event.target.value);
  };

  const handleValueChange = (event) => {
    setValue(event.target.value);
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();

    const newTransaction = {
      description,
      value,
      category,
      yearMonthDay: date,
      type,
    };

    onSave(newTransaction);
  };

  return (
    <div>
      <Modal isOpen={isModalOpen} style={styles}>
        <div style={styles.titleWrap}>
          <p style={styles.title}>Adicionar Nova Transação</p>
          <i
            className="material-icons"
            style={styles.icons}
            onClick={handleCloseModal}
          >
            close
          </i>
        </div>
        <div>
          <form onSubmit={handleSubmitForm}>
            <div style={styles.formContainer}>
              <div style={styles.radioStyle}>
                <label>
                  <input
                    name="expense-earning"
                    type="radio"
                    value="-"
                    onChange={handleTypeChange}
                    required
                  />
                  <span>Despesa</span>
                </label>
                <label>
                  <input
                    name="expense-earning"
                    type="radio"
                    value="+"
                    onChange={handleTypeChange}
                    required
                  />
                  <span>Receita</span>
                </label>
              </div>

              <div className="input-field">
                <input
                  id="inputDescription"
                  type="text"
                  onChange={handleDescriptionChange}
                  autoFocus
                  required
                />
                <label htmlFor="inputDescription" className="active">
                  Descrição:
                </label>
              </div>

              <div className="input-field">
                <input type="text" onChange={handleCategoryChange} required />
                <label className="active">Categoria:</label>
              </div>

              <div style={styles.valueAndDate}>
                <div className="input-field">
                  <input
                    type="number"
                    onChange={handleValueChange}
                    required
                    style={{ width: '90%' }}
                  />
                  <label className="active">Valor:</label>
                </div>

                <div>
                  <input
                    type="date"
                    value={date}
                    onChange={handleDateChange}
                    required
                  />
                </div>
              </div>
            </div>

            <div style={styles.submit}>
              <input
                type="submit"
                className="waves-effect waves-light btn"
                value="Salvar"
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

const styles = {
  content: {
    width: '400px',
    height: '540px',
  },
  titleWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '5%',
  },
  icons: {
    cursor: 'pointer',
  },
  title: {
    fontSize: '20px',
  },
  formContainer: {
    border: '1px solid lightgray',
    borderRadius: '5px',
    padding: '10px 10px 20px 10px',
  },
  radioStyle: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: '30px 0 30px 0',
  },
  valueAndDate: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  submit: {
    padding: '15px 0',
  },
};
