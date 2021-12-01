import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import { formatAsPrice } from 'utils/order';
import AddProductToCart from 'components/AddProductToCart';
import * as actions from 'actions/dishes';

import { DishPropTypes } from '../sharedPropTypes';

const useStyles = makeStyles((theme) => ({
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

export const Dishes = ({ dishes, getAllDishes }) => {
  const classes = useStyles();

  useEffect(() => {
    getAllDishes();
  }, []);

  return (
    <Grid container spacing={4}>
      {dishes.map((dish) => (
        <Grid item key={dish.id} xs={12} sm={5} md={3}>
          <Card className={classes.card}>
            <CardMedia
              className={classes.cardMedia}
              image={dish.imageUrl}
              title="Image title"
            />
            <CardContent className={classes.cardContent}>
              <Typography gutterBottom variant="h5">
                {dish.name}
              </Typography>
              <Typography>
                {formatAsPrice(dish.cost)}
              </Typography>
              <Typography variant="caption">
                {`${dish.calories} ккaл`}
              </Typography>
            </CardContent>
            <CardActions>
              <AddProductToCart dish={dish} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

const mapStateToProps = (state) => ({
  dishes: state.dishes,
});

const mapDispatchToProps = {
  getAllDishes: actions.getAllPurchasedDishes,
};

Dishes.propTypes = {
  dishes: PropTypes.arrayOf(DishPropTypes).isRequired,
  getAllDishes: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);
