import React from 'react';
import Typography from '@mui/material/Typography';
import CartItems from 'components/CartItems';
import { useSelector } from 'react-redux';

import { selectCartItems } from 'reducers/cart';

export default function ReviewCart({ totalPrice }) {
  const cartItems = useSelector(selectCartItems);

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Информация о заказе
      </Typography>
      <CartItems items={cartItems} totalPrice={totalPrice} isEditable />
    </>
  );
}
