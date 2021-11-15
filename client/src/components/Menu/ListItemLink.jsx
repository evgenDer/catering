import * as React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  active: {
    color: theme.appColors.primary,
    '& .MuiSvgIcon-root': {
      color: theme.appColors.primary,
    },
  },
}));

const ListItemLink = ({ icon, primary, to }) => {
  const classes = useStyles();
  const { pathname } = useLocation();

  return (
    <ListItem
      button
      component={RouterLink}
      to={to}
      className={clsx({
        [classes.active]: pathname.includes(to),
      })}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={primary} />
    </ListItem>
  );
};

ListItemLink.propTypes = {
  icon: PropTypes.element.isRequired,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
};

export default ListItemLink;
