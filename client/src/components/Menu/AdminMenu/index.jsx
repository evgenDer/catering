
import React from 'react';
import { PanelMenu } from 'primereact/panelmenu';
import { useLocation, useNavigate } from 'react-router-dom';

import { ADMIN_ROUTES, ROUTES } from 'constants/routes';

import '../Menu.scss';

const AdminMenu = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  
  const navigateToPage = (path) => {
    navigate(path);
  };

  const getClassNameFromPath = (path) => {
    return pathname === `${ROUTES.ADMIN}/${path}` ? 'menu__item_active' : null;
  };

  const items = [
    {
      label: 'Заказы',
      icon: 'pi pi-fw pi-shopping-cart',
      items: [
        {
          label: 'Новые',
          icon: 'pi pi-fw pi-plus',
          className: getClassNameFromPath(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.NEW}`),
          command: () => {
            navigateToPage(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.NEW}`);
          },
        },
        {
          label: 'В работе',
          icon: 'pi pi-fw pi-spinner',
          className: getClassNameFromPath(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.IN_WORK}`),
          command: () => {
            navigateToPage(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.IN_WORK}`);
          },
        },
        {
          label: 'Готовые к доставке',
          icon: 'pi pi-fw pi-calendar-times',
          className: getClassNameFromPath(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.READY}`),
          command: () => {
            navigateToPage(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.READY}`);
          },
        },
        {
          label: 'В процессе доставки',
          icon: 'pi pi-fw pi-send',
          className: getClassNameFromPath(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.ON_DELIVERY}`),
          command: () => {
            navigateToPage(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.ON_DELIVERY}`);
          },
        },
        {
          label: 'Завершенные',
          icon: 'pi pi-fw pi-check',
          className: getClassNameFromPath(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.COMPLETED}`),
          command: () => {
            navigateToPage(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.COMPLETED}`);
          },
        },
        {
          label: 'Отмененные',
          icon: 'pi pi-fw pi-times',
          className: getClassNameFromPath(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.CANCELED}`),
          command: () => {
            navigateToPage(`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.CANCELED}`);
          },
        },
      ],
    },
    {
      label: 'Блюда',
      icon: 'pi pi-fw pi-book',
      items: [
        {
          label: 'Создание',
          icon: 'pi pi-fw pi-plus',
          className: getClassNameFromPath(`${ADMIN_ROUTES.DISHES.ROOT}/${ADMIN_ROUTES.DISHES.NEW}`),
          command: () => {
            navigateToPage(`${ADMIN_ROUTES.DISHES.ROOT}/${ADMIN_ROUTES.DISHES.NEW}`);
          },
        },
        {
          label: 'Список',
          icon: 'pi pi-fw pi-table',
          className: getClassNameFromPath(`${ADMIN_ROUTES.DISHES.ROOT}/${ADMIN_ROUTES.DISHES.LIST}`),
          command: () => {
            navigateToPage(`${ADMIN_ROUTES.DISHES.ROOT}/${ADMIN_ROUTES.DISHES.LIST}`);
          },
        },
      ],
    },
    {
      label: 'Пользователи',
      icon: 'pi pi-fw pi-user',
      items: [
        {
          label: 'Создание',
          icon: 'pi pi-fw pi-plus',
          className: getClassNameFromPath(`${ADMIN_ROUTES.USERS.ROOT}/${ADMIN_ROUTES.USERS.NEW}`),
          command: () => {
            navigateToPage(`${ADMIN_ROUTES.USERS.ROOT}/${ADMIN_ROUTES.USERS.NEW}`);
          },
        },
        {
          label: 'Список',
          icon: 'pi pi-fw pi-table',
          className: getClassNameFromPath(`${ADMIN_ROUTES.USERS.ROOT}/${ADMIN_ROUTES.USERS.LIST}`),
          command: () => {
            navigateToPage(`${ADMIN_ROUTES.USERS.ROOT}/${ADMIN_ROUTES.USERS.LIST}`);
          },
        },
      ],
    },
    {
      label: 'Выход',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        // TODO: add when logout will be completed
        // navigateToPage(`${ADMIN_ROUTES.USERS.ROOT}/${ADMIN_ROUTES.USERS.LIST}`);
      },
    }
  ];

  return (
    <div className="menu">
      <h2 className="menu__title">V<span>oo</span>d</h2>
      <PanelMenu model={items} className="menu__panel" multiple />
    </div>
  )
};

export default AdminMenu;
