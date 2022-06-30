export default function formatCurrency(value, locale = 'vi', currency = 'VND') {
  console.log('formatCurrency ~ value', value);
  if ((!value && value !== 0) || Number.isNaN(Number(value))) return '';
  return Number(value).toLocaleString(locale, {
    style: 'currency',
    currency,
  });
}
