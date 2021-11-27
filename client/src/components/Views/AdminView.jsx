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

import { MENU } from './menu';

const AdminView = () => (
  <Box sx={{ display: 'flex' }}>
    <Menu listItems={MENU} />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Routes>
        <Route path={ADMIN_ROUTES.DISHES} element={<TablePurchaseDishes />} />
        <Route path={ADMIN_ROUTES.ORGANIZATIONS} element={<TableOrganizations />} />
        <Route path={ADMIN_ROUTES.USERS} element={<TableUsers />} />
        <Route
          path="/"
          element={<Navigate replace to={`${ROUTES.ADMIN}/${ADMIN_ROUTES.DISHES}`} />}
        />
      </Routes>
    </Box>
  </Box>
);

export default AdminView;
