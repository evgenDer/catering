import React from 'react';
import { makeStyles } from '@mui/styles';

import PageTitle from 'components/PageTitle';

import Dishes from './Dishes';

const useStyles = makeStyles((theme) => ({
  content: {
    padding: theme.spacing(0, 0, 3),
  },
}));

export default function PageDishes() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <PageTitle>Магазин</PageTitle>
      <Dishes />
    </div>
  );
}
