export const formatCurrency = (amount: number): string => {
  return `Ksh ${amount.toLocaleString('en-KE', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  })}`;
};

export const parseCurrency = (value: string): number => {
  // Remove 'Ksh' and any whitespace, then parse the number
  const numericValue = value.replace(/[^\d.-]/g, '');
  return parseFloat(numericValue) || 0;
};

export const validateCurrency = (value: string): boolean => {
  // Allow numbers with optional decimal points and optional 'Ksh' prefix
  const currencyRegex = /^(Ksh\s*)?\d+(\.\d{1,2})?$/;
  return currencyRegex.test(value);
}; 