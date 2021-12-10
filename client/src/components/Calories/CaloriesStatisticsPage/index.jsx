import React from 'react';
import { Paper } from '@mui/material';
import { makeStyles } from '@mui/styles';

import PageTitle from 'components/PageTitle';

import CaloriesGraph from './CaloriesGraph';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '70vh',
    padding: theme.spacing(2, 8),
    marginBottom: theme.spacing(2),
    textAlign: 'start',
  },
}));

const CaloriesStatisticsPage = () => {
  const classes = useStyles();

  return (
    <>
      <PageTitle>Статистика питательных веществ за день</PageTitle>
      <Paper className={classes.root}>
        <CaloriesGraph />
      </Paper>
    </>
  );
};

export default CaloriesStatisticsPage;
