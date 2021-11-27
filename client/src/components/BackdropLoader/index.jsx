import React from 'react';
import PropTypes from 'prop-types';
import {
  Backdrop,
  CircularProgress,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  backdrop: {
    flexDirection: 'column',
    backgroundColor: 'rgba(255, 255, 255, 0.6) !important',
    zIndex: theme.zIndex.drawer + 1,
  },
  typography: {
    marginTop: theme.spacing(1),
    color: theme.appColors.secondary,
  },
}));

const BackdropLoader = ({ isLoading }) => {
  const classes = useStyles();

  return (
    <Backdrop open={isLoading} className={classes.backdrop}>
      <CircularProgress size={100} thickness={2.5} />
      <Typography className={classes.typography}>Loading...</Typography>
    </Backdrop>
  );
};

BackdropLoader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default BackdropLoader;
