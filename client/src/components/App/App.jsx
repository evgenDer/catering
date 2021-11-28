import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import { AdminView, HeadOrganizationView } from 'components/Views';
import { LoginForm, RegisterForm } from 'components/Login';
import { ROLES } from 'constants/application';
import * as actions from 'actions/user';
import BackdropLoader from 'components/BackdropLoader';

const App = ({ user, getCurrentUser }) => {
  useEffect(() => {
    if (user.authorized) {
      getCurrentUser();
    }
  }, [user.authorized]);

  if (user.loading) {
    return <BackdropLoader isLoading={user.loading} />;
  }

  return (
    user.authorized ? (
      <>
        {(() => {
          switch (user.roleName) {
          case ROLES.ADMIN:
            return <AdminView />;
          case ROLES.HEAD_ORGANIZATION:
            return <HeadOrganizationView />;
          case ROLES.USER:
            return <AdminView />;
          default:
            return <></>;
          }
        })()}
      </>
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
    loading: PropTypes.bool,
  }).isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
