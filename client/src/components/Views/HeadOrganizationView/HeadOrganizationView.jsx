import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Box } from '@mui/material';

import Menu from 'components/Menu';
import { HEAD_ORGANIZATION_ROUTES, ROUTES } from 'constants/routes';
import DrawerHeader from 'components/DrawerHeader';
import { TableUsers } from 'components/Users';
import ErrorPage from 'components/ErrorPage';
import { OrganizationProfile, TableOrganizationPayments } from 'components/Organizations';

import { MENU } from './menu';

const HeadOrganizationView = () => (
  <Box sx={{ display: 'flex' }}>
    <Menu listItems={MENU} />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Routes>
        <Route path="/" element={<Navigate replace to={HEAD_ORGANIZATION_ROUTES.ORGANIZATION} />} />
        <Route path={HEAD_ORGANIZATION_ROUTES.ORGANIZATION} element={<OrganizationProfile />} />
        <Route path={HEAD_ORGANIZATION_ROUTES.PROFILE} element={<>Profile</>} />
        <Route path={HEAD_ORGANIZATION_ROUTES.STATISTICS} element={<>Statistics</>} />
        <Route path={HEAD_ORGANIZATION_ROUTES.USERS} element={<TableUsers />} />
        <Route
          path={HEAD_ORGANIZATION_ROUTES.HISTORY_PAYMENT}
          element={<TableOrganizationPayments />}
        />
        <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
      </Routes>
    </Box>
  </Box>
);

export default HeadOrganizationView;
