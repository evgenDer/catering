const priceFormatter = new Intl.NumberFormat('ru-RU', {
  style: 'currency',
  currency: 'RUB',
});

export const formatAsPrice = (price) => priceFormatter.format(price);
