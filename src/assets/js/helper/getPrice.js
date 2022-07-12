import formatCurrency from './formatCurrency';

export default function getPrice(price, discount) {
  if (!price && price !== 0) return formatCurrency(0);
  if (discount) {
    return formatCurrency((price * (100 - discount)) / 100);
  }
  return formatCurrency(price);
}
