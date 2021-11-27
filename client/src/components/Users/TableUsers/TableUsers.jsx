import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import {
  DataGrid,
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
} from '@mui/x-data-grid';

import * as actions from 'actions/user';
import { LOCALE_TEXT } from 'constants/localeText';

import { columns } from './cols';
import { UserPropType } from '../sharedPropTypes';

const useStyles = makeStyles((theme) => ({
  table: {
    height: '80vh',
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
  button: {
    marginTop: theme.spacing(2),
    height: theme.spacing(4),
  },
}));

export const TableUsers = ({ users, getAllUsers }) => {
  const classes = useStyles();

  useEffect(() => {
    getAllUsers();
  }, []);

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );

  return (
    <>
      <Typography variant="h5" className={classes.pageTitle}>Пользователи</Typography>
      <div className={classes.table}>
        <DataGrid
          rows={users}
          columns={columns}
          localeText={LOCALE_TEXT}
          components={{
            Toolbar: CustomToolbar,
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = {
  getAllUsers: actions.getAllUsers,
};

TableUsers.propTypes = {
  users: PropTypes.arrayOf(UserPropType).isRequired,
  getAllUsers: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUsers);
