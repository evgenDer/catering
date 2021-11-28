import React from 'react';
import {
  Analytics,
  Business,
  SupervisedUserCircle,
  PersonOutline,
  History,
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
  {
    icon: <SvgIcon color="secondary" component={Analytics} />,
    title: 'Статистика',
    link: HEAD_ORGANIZATION_ROUTES.STATISTICS,
  },
  {
    icon: <SvgIcon color="secondary" component={SupervisedUserCircle} viewBox="0 0 24 24" />,
    title: 'Пользователи',
    link: HEAD_ORGANIZATION_ROUTES.USERS,
  },
  {
    icon: <SvgIcon color="secondary" component={History} viewBox="0 0 24 24" />,
    title: 'История платежей',
    link: HEAD_ORGANIZATION_ROUTES.HISTORY_PAYMENT,
  },
];
