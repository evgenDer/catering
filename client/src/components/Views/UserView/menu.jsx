import React from 'react';
import {
  AddBusiness,
  Analytics,
  Calculate,
  PersonOutline,
  LocalShipping,
  LibraryBooks,
  Group,
  HelpCenter,
} from '@mui/icons-material';
import { SvgIcon } from '@mui/material';

import { USER_ROUTES } from 'constants/routes';

export const MENU = [
  {
    icon: <SvgIcon color="secondary" component={PersonOutline} />,
    title: 'Профиль',
    link: USER_ROUTES.PROFILE,
  },
  {
    icon: <SvgIcon color="secondary" component={LibraryBooks} viewBox="0 0 24 24" />,
    title: 'Дневник калорийности',
    link: USER_ROUTES.DIARY,
  },
  {
    icon: <SvgIcon color="secondary" component={Analytics} />,
    title: 'Статистика',
    link: USER_ROUTES.STATISTICS,
  },
  {
    icon: <SvgIcon color="secondary" component={AddBusiness} viewBox="0 0 24 24" />,
    title: 'Магазин',
    link: USER_ROUTES.SHOP,
  },
  {
    icon: <SvgIcon color="secondary" component={LocalShipping} viewBox="0 0 24 24" />,
    title: 'Заказы',
    link: USER_ROUTES.ORDERS,
  },
  {
    icon: <SvgIcon color="secondary" component={Group} viewBox="0 0 24 24" />,
    title: 'Друзья',
    link: USER_ROUTES.FRIENDS,
  },
  {
    icon: <SvgIcon color="secondary" component={Calculate} />,
    title: 'Расчет калорийности',
    link: USER_ROUTES.CALCULATOR,
  },
  {
    icon: <SvgIcon color="secondary" component={HelpCenter} viewBox="0 0 24 24" />,
    title: 'Отправить вопрос',
    link: USER_ROUTES.QUESTION,
  },
];
