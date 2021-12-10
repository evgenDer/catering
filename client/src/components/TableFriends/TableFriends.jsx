import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { UserPropType } from 'components/Users/sharedPropTypes';
import { USER_ROUTES } from 'constants/routes';

import { columns } from './cols';

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
  button: {
    marginTop: theme.spacing(2),
    height: theme.spacing(4),
  },
}));

const TableFriends = ({ friends, getAllFriends, getFriend }) => {
  const classes = useStyles();
  const navigate = useNavigate();

  useEffect(() => {
    getAllFriends();
  }, []);

  const CustomToolbar = () => (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
    </GridToolbarContainer>
  );

  return (
    <>
      <Typography variant="h5" className={classes.pageTitle}>Доступные для просмотра пользователи</Typography>
      <div className={classes.table}>
        <DataGrid
          rows={friends}
          columns={columns}
          localeText={LOCALE_TEXT}
          components={{
            Toolbar: CustomToolbar,
          }}
          onSelectionModelChange={async (newSelection) => {
            const friendId = newSelection[0];

            await getFriend(friendId);
            navigate(`/${USER_ROUTES.DIARY}/${friendId}`);
          }}
        />
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  friends: state.users,
});

const mapDispatchToProps = {
  getAllFriends: actions.getAvailableSharingUsers,
  getFriend: actions.getCurrentUserFriend,
};

TableFriends.propTypes = {
  friends: PropTypes.arrayOf(UserPropType).isRequired,
  getAllFriends: PropTypes.func.isRequired,
  getFriend: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(TableFriends);
