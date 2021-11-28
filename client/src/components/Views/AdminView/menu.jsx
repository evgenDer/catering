import React from 'react';
import {
  AddShoppingCart,
  Business,
  SupervisedUserCircle,
  LocalDining,
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

import { ADMIN_ROUTES } from 'constants/routes';

export const MENU = [
  {
    icon: <SvgIcon color="secondary" component={LocalDining} />,
    title: 'Блюда',
    link: ADMIN_ROUTES.DISHES,
  },
  {
    icon: <SvgIcon color="secondary" component={AddShoppingCart} />,
    title: 'Заказы',
    link: ADMIN_ROUTES.ORDERS,
  },
  {
    icon: <SvgIcon color="secondary" component={Business} />,
    title: 'Организации',
    link: ADMIN_ROUTES.ORGANIZATIONS,
  },
  {
    icon: <SvgIcon color="secondary" component={SupervisedUserCircle} viewBox="0 0 24 24" />,
    title: 'Пользователи',
    link: ADMIN_ROUTES.USERS,
  },
];
