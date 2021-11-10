import React from 'react';
import {
  Link as RouterLink,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { AdminMenu } from 'components/Menu';
import { ADMIN_ROUTES, ROUTES } from 'constants/routes';

const AdminView = () => {
  return ( 
    <div className="card-container flex">
      <AdminMenu />
      <Routes>
        <Route 
          path="/" 
          element={<Navigate replace to={`${ROUTES.ADMIN}/${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.NEW}`} /> }
        />
        <Route path={`${ADMIN_ROUTES.ORDERS.ROOT}/${ADMIN_ROUTES.ORDERS.NEW}`} element={<>New product</>} />
      </Routes>
    </div>
  )
};

export default AdminView;