import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import {
  Paper,
  Grid,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';

import * as actions from 'actions/user';
import PageTitle from 'components/PageTitle';
import { UserOrderGraph } from 'components/Orders';
import { formatAsPrice } from 'utils/order';

import { UserPropType } from '../sharedPropTypes';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    minHeight: '70vh',
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.appColors.primary,
  },
  iconContainer: {
    marginBottom: theme.spacing(2),
    '& .MuiTypography-root': {
      fontSize: theme.spacing(3),
    },
    '& .MuiSvgIcon-root': {
      width: theme.spacing(5),
      height: theme.spacing(5),
      marginRight: theme.spacing(1),
    },
  },
}));

const OrganizationProfile = ({
  user,
  currentUser,
}) => {
  const classes = useStyles();

  useEffect(() => {
    currentUser();
  }, []);

  return (
    <>
      <PageTitle>Мой профиль</PageTitle>
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          {`${user.profile.name} ${user.profile.surname}`}
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Grid container spacing={5}>
              <Grid item>
                <Typography>Баланс</Typography>
                <Grid container className={classes.iconContainer}>
                  <PaymentIcon color="secondary" />
                  <Typography variant>{`${formatAsPrice(user.profile.account.balance)}`}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography>Роль</Typography>
                <Grid container className={classes.iconContainer}>
                  <PeopleIcon color="secondary" />
                  <Typography variant>{user.roleName}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography>Организация</Typography>
                <Grid container className={classes.iconContainer}>
                  <BusinessIcon color="secondary" />
                  <Typography variant>{user.profile.organizationName}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography>Электронная почта</Typography>
                <Grid container className={classes.iconContainer}>
                  <EmailIcon color="secondary" />
                  <Typography variant>{user.email}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography>Телефон</Typography>
                <Grid container className={classes.iconContainer}>
                  <ContactPhoneIcon color="secondary" />
                  <Typography variant>{user.profile.phone}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="h6">Расходы по дням недели</Typography>
            <UserOrderGraph />
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = {
  currentUser: actions.getCurrentUser,
};

OrganizationProfile.propTypes = {
  user: UserPropType.isRequired,
  currentUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationProfile);
