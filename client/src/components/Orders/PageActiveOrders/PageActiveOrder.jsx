import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import PageTitle from 'components/PageTitle';
import * as actions from 'actions/order';

import { OrderPropType } from '../sharedPropTypes';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
  },
  cardMedia: {
    width: theme.spacing(20),
    height: theme.spacing(20),
    margin: theme.spacing(2), // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

const PageActiveOrders = ({ orders, getAllOrders }) => {
  const classes = useStyles();

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <PageTitle>Текущие заказы</PageTitle>
      {orders.length ? (
        <Grid container spacing={4}>
          {orders.map((order) => (
            <Grid item key={order.id} xs={12} sm={8} md={6}>
              <Card className={classes.card}>
                <CardMedia
                  className={classes.cardMedia}
                  image={order.purchaseDish.dish.imageUrl}
                  title="Image title"
                />
                <CardContent className={classes.cardContent}>
                  <Typography gutterBottom variant="h5">
                    {order.purchaseDish.dish.name}
                  </Typography>
                  <Typography variant="h6">
                    {order.status.name}
                  </Typography>
                  <Typography>
                    {`Адрес: ${order.address}`}
                  </Typography>
                  <Typography variant="caption">
                    {`Количество: ${order.count}`}
                  </Typography>
                  <br />
                  <Typography variant="caption">
                    {`Время создания: ${new Date(order.createdAt).toLocaleString()}`}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" gutterBottom>
          У вас нет заказов
        </Typography>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  orders: state.activeOrders,
});

const mapDispatchToProps = {
  getAllOrders: actions.getAllUserActiveOrders,
};

PageActiveOrders.propTypes = {
  orders: PropTypes.arrayOf(OrderPropType).isRequired,
  getAllOrders: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(PageActiveOrders);
