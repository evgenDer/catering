import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { makeStyles } from '@mui/styles';
import { useSelector } from 'react-redux';

import { formatAsPrice } from 'utils/order';
import AddProductToCart from 'components/AddProductToCart';
import { currentUser } from 'reducers/user';

import { DishPropTypes } from 'components/Dishes/sharedPropTypes';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  invalid: {
    color: theme.appColors.dangerous,
  },
}));

// TODO: change object
export default function CartItems({ items, isEditable, totalPrice }) {
  const classes = useStyles();
  const user = useSelector(currentUser);
  const isInsufficientFunds = totalPrice > user.profile?.account.balance;

  return (
    <>
      <List disablePadding>
        {items.map((cartItem) => (
          <ListItem className={classes.listItem} key={cartItem.product.id}>
            {isEditable && <AddProductToCart dish={cartItem.product} />}
            <ListItemText
              primary={cartItem.product.name}
              secondary={cartItem.product.description}
            />
            <Typography
              variant="subtitle1"
            >
              {formatAsPrice(cartItem.product.cost)}
              {' '}
              x
              {' '}
              {cartItem.count}
              {' '}
              =
              {' '}
              {formatAsPrice(cartItem.product.cost * cartItem.count)}

            </Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Доставка" />
          <Typography
            variant="subtitle1"
          >
            Бесплатно
          </Typography>
        </ListItem>
        <ListItem className={classes.listItem}>
          <ListItemText primary="К оплате" />
          <Typography variant="subtitle1" className={clsx(classes.total, { [classes.invalid]: isInsufficientFunds })}>
            {formatAsPrice(totalPrice)}
          </Typography>
        </ListItem>
        <Typography variant="caption" className={clsx(classes.total, { [classes.invalid]: isInsufficientFunds })}>
          {isInsufficientFunds && '*На вашем счету недостаточно средств. Обратитесь за деталями в вашу организацию'}
        </Typography>
      </List>
    </>
  );
}

CartItems.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    product: DishPropTypes.isRequired,
    count: PropTypes.number.isRequired,
  })).isRequired,
  isEditable: PropTypes.bool,
  totalPrice: PropTypes.number.isRequired,
};

CartItems.defaultProps = {
  isEditable: false,
};
