import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import IconButton from '@mui/material/IconButton';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import { selectCartItems } from 'reducers/cart';

const Cart = () => {
  const cartItems = useSelector(selectCartItems);
  const badgeContent = cartItems.length || undefined;

  return (
    <IconButton
      aria-label="show 4 new mails"
      color="inherit"
      component={Link}
      to={ROUTES.CART}
    >
      <Badge badgeContent={badgeContent} color="secondary">
        <ShoppingCartIcon color="primary" />
      </Badge>
    </IconButton>
  );
};

export default Cart;
