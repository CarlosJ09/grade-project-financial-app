const formatCurrency = (amount: number, currency: string = 'USD') => {
  return amount.toLocaleString('en-US', {
    style: 'currency',
    currency: currency,
  });
};

export { formatCurrency };
