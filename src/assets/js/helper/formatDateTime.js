import _isValid from 'date-fns/isValid';
import _format from 'date-fns/format';

export default function formatDateTime(date, format = 'dd/MM/yyyy', options = {}) {
  if (!date || !_isValid(new Date(date))) return '';
  return _format(new Date(date), format, options);
}
