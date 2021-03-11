import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/transaction',
  headers: {
    'Content-type': 'application/json',
  },
});

const getAllTransactions = () => {
  return api.get('/getAll');
};

const deleteTransaction = (id) => {
  return api.delete(`/${id}`);
};

const insertTransaction = (transaction) => {
  return api.post('/', transaction);
};

const editTransaction = (transaction) => {
  const { id } = transaction;

  return api.put(`/${id}`, transaction);
};

export default {
  getAllTransactions,
  deleteTransaction,
  insertTransaction,
  editTransaction,
};
