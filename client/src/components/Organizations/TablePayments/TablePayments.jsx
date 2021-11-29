import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarExport,
} from '@mui/x-data-grid';
import { Grid, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

import * as actions from 'actions/organizations';
import { LOCALE_TEXT } from 'constants/localeText';

import { columns } from './cols';
import { PaymentPropType } from '../sharedPropTypes';

const useStyles = makeStyles((theme) => ({
  table: {
    height: '75vh',
    width: '100%',
    backgroundColor: theme.appColors.white,
  },
  pageTitle: {
    marginBottom: theme.spacing(1),
  },
  toolbarContainer: {
    height: theme.spacing(7),
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 3),
  },
}));

export const TablePayments = ({ getPayments, payments }) => {
  const classes = useStyles();

  useEffect(() => {
    getPayments();
  }, []);

  const CustomToolbar = () => (
    <Grid container>
      <GridToolbarContainer>
        <GridToolbarColumnsButton />
        <GridToolbarExport
          csvOptions={{ fileName: 'История платежей' }}
        />
      </GridToolbarContainer>
    </Grid>
  );

  return (
    <>
      <Typography variant="h5" className={classes.pageTitle}>
        История платежей
      </Typography>
      <div className={classes.table}>
        <DataGrid
          rows={payments}
          columns={columns}
          localeText={LOCALE_TEXT}
          checkboxSelection
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  payments: state.organization?.payments,
});

const mapDispatchToProps = {
  getPayments: actions.getOrganizationPayments,
};

TablePayments.propTypes = {
  payments: PropTypes.arrayOf(PaymentPropType).isRequired,
  getPayments: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePayments);
