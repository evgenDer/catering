import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { Grid, Paper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import PageTitle from 'components/PageTitle';
import * as actions from 'actions/consumption';
import { currentUserFriend, currentUser } from 'reducers/user';
import { MEALS } from 'constants/application';

import CaloriesMeal from './CaloriesMeal';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '70vh',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  table: {
    marginTop: theme.spacing(4),
    textAlign: 'center',
    border: `${theme.spacing(0.1)}`,
    fontSize: theme.spacing(2),
  },
  friendTitle: {
    marginBottom: theme.spacing(2),
    color: theme.appColors.primary,
  },
}));

const DiaryPage = ({ consumptions, getConsumptions }) => {
  const classes = useStyles();
  const { id: userId } = useParams();
  const user = useSelector(userId ? currentUserFriend : currentUser);
  const total = Object.values(consumptions).reduce((curr, acc) => curr + acc.total.calories, 0);

  useEffect(() => {
    getConsumptions(userId);
  }, []);

  return (
    <>
      <PageTitle>{`Дневник текущей калорийности ${userId ? 'друга' : ''}`}</PageTitle>
      <Paper className={classes.root}>
        {userId && (
          <Typography className={classes.friendTitle} variant="h5">
            {`Вы просматриваете дневник ${user.profile.name} ${user.profile.surname}`}
          </Typography>
        )}
        <Grid>
          <Typography variant="h6">Осталось калорий</Typography>
          <Grid container spacing={3}>
            <Grid item>
              <Typography variant="body1">{user.profile.goalCalories}</Typography>
              <Typography variant="caption">Цель</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{' - '}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{total}</Typography>
              <Typography variant="caption">Блюда</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{' = '}</Typography>
            </Grid>
            <Grid item>
              <Typography variant="body1">{Math.round(user.profile.goalCalories - total)}</Typography>
              <Typography variant="caption">Осталось</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <table className={classes.table}>
            {Object.values((MEALS)).map((meal, index) => (
              <CaloriesMeal
                mealName={meal}
                isFirstElement={!index}
                dishes={consumptions[meal]?.dishes}
                total={consumptions[meal]?.total}
                isCurrentUserMeal={!userId}
              />
            ))}
          </table>
        </Grid>
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => ({
  consumptions: state.consumptions,
});

const mapDispatchToProps = {
  getConsumptions: actions.getAllConsumption,
};

DiaryPage.propTypes = {
  consumptions: PropTypes.shape({}).isRequired,
  getConsumptions: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(DiaryPage);
