import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export const formatDate = (date) => {
  return format(new Date(date), "dd 'de' MMMM, yyyy", { locale: es });
};

export const formatDateTime = (date) => {
  return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: es });
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('es-BO', {
    style: 'currency',
    currency: 'BOB',
  }).format(amount);
};

export const getInitials = (name) => {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .substring(0, 2);
};