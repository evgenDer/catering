import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash';
import {
  Alert,
  Button,
  Paper,
  Grid,
  Typography,
  Snackbar,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import EmailIcon from '@mui/icons-material/Email';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';
import AddIcon from '@mui/icons-material/Add';

import * as actions from 'actions/organizations';
import PageTitle from 'components/PageTitle';
import CustomDateRangePickerDay from 'components/CustomDateRangePickerDay';
import BackdropLoader from 'components/BackdropLoader';

import { OrganizationPropType } from '../sharedPropTypes';
import PaymentDialog from '../PaymentDialog';

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
  organization,
  createPayment,
  getOrganization,
}) => {
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    getOrganization();
  }, [organization.currentPayment]);

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleOpenDialog = () => {
    setOpen(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
    setAlert(null);
  };

  const handleCreate = (values, { setSubmitting }) => {
    const createdPayment = {
      sum: values.sum,
      startDate: values.startDate,
      endDate: values.endDate,
    };

    createPayment(createdPayment).then(() => {
      setSubmitting(false);

      setAlert({
        type: 'success',
        message: 'Payment has been successfully created',
      });
    }).catch((error) => {
      setSubmitting(false);

      setAlert({
        type: 'error',
        message: error.message,
      });
    }).finally(() => {
      setOpenSnackbar(true);
      handleCloseDialog();
    });
  };

  if (isEmpty(organization)) {
    return <BackdropLoader isLoading={isEmpty(organization)} />;
  }

  return (
    <>
      <PageTitle>Организация</PageTitle>
      {alert && (
        <Snackbar open={openSnackbar} onClose={handleCloseSnackbar}>
          <Alert onClose={handleCloseSnackbar} severity={alert.type} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
      )}
      <PaymentDialog
        open={open}
        onConfirm={handleCreate}
        onCancel={handleCloseDialog}
        usersCount={organization.countUsers}
      />
      <Paper className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          {organization.name}
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Grid container spacing={3}>
              <Grid item>
                <Typography>Количество пользователей</Typography>
                <Grid container className={classes.iconContainer}>
                  <PeopleIcon color="secondary" />
                  <Typography variant>{`${organization.countUsers} человек(a)`}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography>Электронная почта</Typography>
                <Grid container className={classes.iconContainer}>
                  <EmailIcon color="secondary" />
                  <Typography variant>{organization.email}</Typography>
                </Grid>
              </Grid>
              <Grid item>
                <Typography>Телефон</Typography>
                <Grid container className={classes.iconContainer}>
                  <ContactPhoneIcon color="secondary" />
                  <Typography variant>{organization.phone}</Typography>
                </Grid>
              </Grid>
              {organization.currentPayment && (
                <Grid item>
                  <Typography>Текущая сумма</Typography>
                  <Grid container className={classes.iconContainer}>
                    <PaymentIcon color="secondary" />
                    <Typography variant>{`${organization.currentPayment?.sum} руб`}</Typography>
                  </Grid>
                </Grid>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Typography>Текущий платеж</Typography>
            {organization.currentPayment ? (
              <CustomDateRangePickerDay
                startDate={new Date(organization.currentPayment?.startDate)}
                endDate={new Date(organization.currentPayment?.endDate)}
              />
            ) : (
              <>
                <Grid container className={classes.iconContainer}>
                  <MoneyOffIcon color="secondary" />
                  <Typography>У вас нет текущих платежей</Typography>
                </Grid>
                <Button
                  startIcon={<AddIcon />}
                  variant="outlined"
                  onClick={handleOpenDialog}
                >
                  Добавить платеж
                </Button>
              </>
            )}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

const mapStateToProps = (state) => ({
  organization: state.organization,
});

const mapDispatchToProps = {
  createPayment: actions.createPayment,
  getOrganization: actions.getOrganizationInfo,
};

OrganizationProfile.propTypes = {
  organization: OrganizationPropType.isRequired,
  createPayment: PropTypes.func.isRequired,
  getOrganization: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrganizationProfile);
