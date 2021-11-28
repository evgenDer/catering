import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Box } from '@mui/material';

import Menu from 'components/Menu';
import { ADMIN_ROUTES, ROUTES } from 'constants/routes';
import { TablePurchaseDishes } from 'components/Dishes';
import DrawerHeader from 'components/DrawerHeader';
import { TableOrganizations } from 'components/Organizations';
import { TableUsers } from 'components/Users';
import ErrorPage from 'components/ErrorPage';

import { MENU } from './menu';

const AdminView = () => (
  <Box sx={{ display: 'flex' }}>
    <Menu listItems={MENU} />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Routes>
        <Route path="/" element={<Navigate replace to={ADMIN_ROUTES.DISHES} />} />
        <Route path={ADMIN_ROUTES.DISHES} element={<TablePurchaseDishes />} />
        <Route path={ADMIN_ROUTES.ORGANIZATIONS} element={<TableOrganizations />} />
        <Route path={ADMIN_ROUTES.USERS} element={<TableUsers />} />
        <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
      </Routes>
    </Box>
  </Box>
);

export default AdminView;
