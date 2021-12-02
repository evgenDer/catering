import React from 'react';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

import CartItems from 'components/CartItems';

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: theme.spacing(2),
  },
}));

export default function ReviewOrder({ address, items, user, totalPrice }) {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6" gutterBottom>
        Описание заказа
      </Typography>
      <CartItems items={items} totalPrice={totalPrice} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Доставка
          </Typography>
          <Typography gutterBottom>
            {user.profile.name}
            {' '}
            {user.profile.surname}
          </Typography>
          <Typography gutterBottom>{address.address}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Комментарий
          </Typography>
          <Typography gutterBottom>{address.comment || 'Вы не оставляли комментариев к заказу'}</Typography>
        </Grid>
      </Grid>
    </>
  );
}
