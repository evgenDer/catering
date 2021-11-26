/* eslint-disable indent */
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,

  useNavigate,
} from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import { AdminView } from 'components/Views';
import ErrorPage from 'components/ErrorPage';
import { LoginForm, RegisterForm } from 'components/Login';
import { ROLES } from 'constants/application';
import * as actions from 'actions/user';

const App = ({ user, getCurrentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user.authorized) {
      getCurrentUser();
      navigate('/');
    }
  }, []);

  return (
    user.authorized ? (
      <Routes>
        {(() => {
          switch (user.roleName) {
          case ROLES.ADMIN:
            return (
              <>
                <Route path={ROUTES.ROOT} element={<Navigate replace to={ROUTES.ADMIN} />} />
                <Route path={`${ROUTES.ADMIN}/*`} element={<AdminView />} />
              </>
            );
          case ROLES.HEAD_ORGANIZATION:
            return (
              <>
                <Route
                  path={ROUTES.ROOT}
                  element={(
                    <Navigate
                      replace
                      to={ROUTES.HEAD_ORGANIZATION}
                    />
                )}
                />
                <Route path={`${ROUTES.HEAD_ORGANIZATION}/*`} element={<AdminView />} />
              </>
            );
          case ROLES.USER:
            return (
              <>
                <Route path={ROUTES.ROOT} element={<Navigate replace to={ROUTES.USER} />} />
                <Route path={`${ROUTES.USER}/*`} element={<AdminView />} />
              </>
          );
          default:
            return <></>;
          }
        })()}
        {user.roleName && <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />}
      </Routes>
    ) : (
      <Routes>
        <Route path={ROUTES.NOT_FOUND} element={<Navigate replace to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<LoginForm />} />
        <Route path={ROUTES.REGISTER} element={<RegisterForm />} />
      </Routes>
    )
  );
};

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

const mapDispatchToProps = {
  getCurrentUser: actions.getCurrentUser,
};

App.propTypes = {
  user: PropTypes.shape({
    authorized: PropTypes.bool,
    token: PropTypes.string,
    roleName: PropTypes.string,
  }).isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
