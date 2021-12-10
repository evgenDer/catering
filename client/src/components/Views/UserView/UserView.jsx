import React from 'react';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';
import { Box } from '@mui/material';

import Menu from 'components/Menu';
import DrawerHeader from 'components/DrawerHeader';
import ErrorPage from 'components/ErrorPage';
import TableFriends from 'components/TableFriends';
import { USER_ROUTES, ROUTES } from 'constants/routes';
import { UserProfile } from 'components/Users';
import PageCart from 'components/PageCart';
import { PageActiveOrders } from 'components/Orders';
import { PageDishes } from 'components/Dishes';
import { CaloriesCalculatorPage, CaloriesDiaryPage, CaloriesStatisticsPage } from 'components/Calories';
import QuestionPage from 'components/QuestionsPage';

import { MENU } from './menu';

const UserView = () => (
  <Box sx={{ display: 'flex' }}>
    <Menu listItems={MENU} />
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <DrawerHeader />
      <Routes>
        <Route path="/" element={<Navigate replace to={USER_ROUTES.PROFILE} />} />
        <Route path={USER_ROUTES.DIARY} element={<CaloriesDiaryPage />}>
          <Route path=":id" element={<CaloriesDiaryPage />} />
        </Route>
        <Route path={USER_ROUTES.STATISTICS} element={<CaloriesStatisticsPage />} />
        <Route path={USER_ROUTES.PROFILE} element={<UserProfile />} />
        <Route path={USER_ROUTES.FRIENDS} element={<TableFriends />} />
        <Route path={USER_ROUTES.SHOP} element={<PageDishes />} />
        <Route path={USER_ROUTES.CART} element={<PageCart />} />
        <Route path={USER_ROUTES.CALCULATOR} element={<CaloriesCalculatorPage />} />
        <Route path={USER_ROUTES.QUESTION} element={<QuestionPage />} />
        <Route path={USER_ROUTES.ORDERS} element={<PageActiveOrders />} />
        <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
      </Routes>
    </Box>
  </Box>
);

export default UserView;
