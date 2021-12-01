import React from 'react';
import Typography from '@mui/material/Typography';
import CartIcon from '@mui/icons-material/ShoppingCart';
import Add from '@mui/icons-material/Add';
import Remove from '@mui/icons-material/Remove';
import IconButton from '@mui/material/IconButton';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems, removeFromCart } from 'reducers/cart';
import { DishPropTypes } from 'components/Dishes/sharedPropTypes';

export default function AddDishToCart({ dish }) {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartItem = cartItems.find((i) => i.product.id === dish.id);

  return (
    <>
      {
        cartItem
          ? (
            <>
              <IconButton onClick={() => dispatch(removeFromCart(dish))}>
                <Remove color="primary" />
              </IconButton>
              <Typography align="center">
                {cartItem.count}
              </Typography>
              {dish.count > cartItem.count && (
                <IconButton
                  onClick={() => dispatch(addToCart(dish))}
                >
                  <Add color="primary" />
                </IconButton>
              )}
            </>
          )
          : (
            <IconButton onClick={() => dispatch(addToCart(dish))}>
              <CartIcon color="primary" />
            </IconButton>
          )
      }
    </>
  );
}

AddDishToCart.propTypes = {
  dish: DishPropTypes.isRequired,
};
