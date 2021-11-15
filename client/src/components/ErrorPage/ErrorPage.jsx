import React from 'react';
import { Typography } from '@mui/material';

import { makeStyles } from '@mui/styles';

import notFoundImage from 'assets/smile.png';

const useStyles = makeStyles((theme) => ({
  errorPage: {
    marginTop: theme.spacing(10),
    color: theme.appColors.primary,
    width: '100%',
    textAlign: 'center',
  },
  title: {
    margin: theme.spacing(2, 0),
  },
  subTitle: {
    marginTop: theme.spacing(2),
  },
  image: {
    width: theme.spacing(50),
    height: theme.spacing(35),
  },
}));

const ErrorPage = () => {
  const classes = useStyles();

  return (
    <div className={classes.errorPage}>
      <img src={notFoundImage} alt="404 error" className={classes.image} />
      <Typography variant="h2" className={classes.title}>404</Typography>
      <Typography variant="h3" className={classes.subTitle}>Страница не найдена</Typography>
    </div>
  );
};

export default ErrorPage;
