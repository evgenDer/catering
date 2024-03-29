import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { styled, useTheme } from '@mui/styles';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';

import DrawerHeader from 'components/DrawerHeader';
import Cart from 'components/Cart';
import * as actions from 'actions/user';
import { ROLES } from 'constants/application';

import ListItemLink from './ListItemLink';

const drawerWidth = 350;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  backgroundColor: `${theme.appColors.white} !important`,
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Logo = styled('div')(({ theme }) => ({
  ...theme.typography.h4,
  color: theme.appColors.primary,
  '& span': {
    color: theme.appColors.secondary,
  },
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const Menu = ({ listItems, logout, roleName }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handlerLogout = () => {
    logout();
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Grid container>
            <IconButton
              color="secondary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: '36px',
                ...(open && { display: 'none' }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Logo>
              V
              <span>oo</span>
              d
            </Logo>
          </Grid>
          {/* TODo: move to classes */}
          <Grid container style={{ width: roleName !== ROLES.ADMIN ? '220px' : '100px' }}>
            {roleName !== ROLES.ADMIN && <Cart />}
            <Button
              color="secondary"
              aria-label="open drawer"
              onClick={handlerLogout}
              startIcon={<LogoutIcon color="secondary" />}
              style={{ textTransform: 'none', marginLeft: '10px' }}
            >
              Выход
            </Button>
          </Grid>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose} color="secondary">
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <nav>
          <List>
            {listItems.map(({ icon, title, link }) => (
              <ListItemLink
                key={title}
                icon={icon}
                primary={title}
                to={link}
              />
            ))}
          </List>
        </nav>
      </Drawer>
    </>
  );
};

const mapStateToProps = (state) => ({
  roleName: state.user.roleName,
});

const mapDispatchToProps = {
  logout: actions.logout,
};

Menu.propTypes = {
  roleName: PropTypes.string.isRequired,
  listItems: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node,
      title: PropTypes.string,
      link: PropTypes.string,
    }),
  ).isRequired,
  logout: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);
