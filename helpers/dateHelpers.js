function validatePeriod(period) {
  if (period.length !== 7) {
    throw new Error(`Valor inválido (${period}). Utilize o formato yyyy-mm`);
  }

  const year = period.substring(0, 4);
  if (!+year) {
    throw new Error(`Ano inválido (${year})`);
  }

  const month = period.substring(5, 7);
  if (!+month || +month < 1 || +month > 12) {
    throw new Error(`Mês inválido (${month})`);
  }
}

module.exports = {
  validatePeriod,
};
