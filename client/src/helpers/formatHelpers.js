const moneyFormat = Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL',
});

function setFormatMoney(money) {
  return moneyFormat.format(money);
}

function today() {
  const date = new Date();
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');

  const today = `${year}-${month}-${day}`;

  return today;
}

export { setFormatMoney, today };
