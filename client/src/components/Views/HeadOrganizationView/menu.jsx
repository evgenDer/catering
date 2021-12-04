import React from 'react';
import {
  AddBusiness,
  Analytics,
  Business,
  SupervisedUserCircle,
  Payments,
  PersonOutline,
  LocalShipping,
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

import { HEAD_ORGANIZATION_ROUTES } from 'constants/routes';

export const MENU = [
  {
    icon: <SvgIcon color="secondary" component={PersonOutline} />,
    title: 'Профиль',
    link: HEAD_ORGANIZATION_ROUTES.PROFILE,
  },
  {
    icon: <SvgIcon color="secondary" component={Business} />,
    title: 'Организация',
    link: HEAD_ORGANIZATION_ROUTES.ORGANIZATION,
  },
  // {
  //   icon: <SvgIcon color="secondary" component={Analytics} />,
  //   title: 'Статистика',
  //   link: HEAD_ORGANIZATION_ROUTES.STATISTICS,
  // },
  {
    icon: <SvgIcon color="secondary" component={SupervisedUserCircle} viewBox="0 0 24 24" />,
    title: 'Пользователи',
    link: HEAD_ORGANIZATION_ROUTES.USERS,
  },
  {
    icon: <SvgIcon color="secondary" component={Payments} viewBox="0 0 24 24" />,
    title: 'Платежи организации',
    link: HEAD_ORGANIZATION_ROUTES.PAYMENTS,
  },
  {
    icon: <SvgIcon color="secondary" component={AddBusiness} viewBox="0 0 24 24" />,
    title: 'Магазин',
    link: HEAD_ORGANIZATION_ROUTES.SHOP,
  },
  {
    icon: <SvgIcon color="secondary" component={LocalShipping} viewBox="0 0 24 24" />,
    title: 'Заказы',
    link: HEAD_ORGANIZATION_ROUTES.ORDERS,
  },
];
