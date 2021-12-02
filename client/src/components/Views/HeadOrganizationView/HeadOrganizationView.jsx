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
import { TableUsers, UserProfile } from 'components/Users';
import ErrorPage from 'components/ErrorPage';
import { PageDishes } from 'components/Dishes';
import { OrganizationProfile, TableOrganizationPayments } from 'components/Organizations';
import PageCart from 'components/PageCart';
import { PageActiveOrders } from 'components/Orders';

import { MENU } from './menu';

const HeadOrganizationView = () => (
  <Box sx={{ display: 'flex' }}>
    <Menu listItems={MENU} />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Routes>
        <Route path="/" element={<Navigate replace to={HEAD_ORGANIZATION_ROUTES.ORGANIZATION} />} />
        <Route path={HEAD_ORGANIZATION_ROUTES.ORGANIZATION} element={<OrganizationProfile />} />
        <Route path={HEAD_ORGANIZATION_ROUTES.PROFILE} element={<UserProfile />} />
        <Route path={HEAD_ORGANIZATION_ROUTES.USERS} element={<TableUsers />} />
        <Route
          path={HEAD_ORGANIZATION_ROUTES.PAYMENTS}
          element={<TableOrganizationPayments />}
        />
        <Route path={HEAD_ORGANIZATION_ROUTES.SHOP} element={<PageDishes />} />
        <Route path={HEAD_ORGANIZATION_ROUTES.CART} element={<PageCart />} />
        <Route path={HEAD_ORGANIZATION_ROUTES.ORDERS} element={<PageActiveOrders />} />
        <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
      </Routes>
    </Box>
  </Box>
);

export default HeadOrganizationView;
