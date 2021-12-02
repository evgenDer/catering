import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { DataGrid } from '@mui/x-data-grid';
import { connect } from 'react-redux';
import { makeStyles } from '@mui/styles';

import * as actions from 'actions/order';
import { LOCALE_TEXT } from 'constants/localeText';
import PageTitle from 'components/PageTitle';

import { columns } from './cols';
import { OrderPropType } from '../sharedPropTypes';

const useStyles = makeStyles((theme) => ({
  table: {
    height: '80vh',
    width: '100%',
    backgroundColor: theme.appColors.white,
  },
}));

const TableOrders = ({ orders, getAllOrders }) => {
  const classes = useStyles();

  useEffect(() => {
    getAllOrders();
  }, []);

  return (
    <>
      <PageTitle>Заказы</PageTitle>
      <div className={classes.table}>
        <DataGrid
          rows={orders}
          columns={columns}
          localeText={LOCALE_TEXT}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  orders: state.orders,
});

const mapDispatchToProps = {
  getAllOrders: actions.getAllOrders,
};

TableOrders.propTypes = {
  orders: PropTypes.arrayOf(OrderPropType).isRequired,
  getAllOrders: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableOrders);
