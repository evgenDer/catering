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
import { LoginForm } from 'components/Login';
import * as actions from 'actions/user';

const App = ({ user, getCurrentUser }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (user.authorized) {
      console.log('user');
      debugger;
      getCurrentUser();
      navigate('/');
    }
  }, [user]);

  console.log(user);

  return (
    user.authorized ? (
      <Routes>
        <Route path={ROUTES.ROOT} element={<Navigate replace to={ROUTES.ADMIN} />} />
        <Route path={`${ROUTES.ADMIN}/*`} element={<AdminView />} />
        <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
      </Routes>
    ) : (
      <Routes>
        <Route path={ROUTES.NOT_FOUND} element={<Navigate replace to={ROUTES.LOGIN} />} />
        <Route path={ROUTES.LOGIN} element={<LoginForm />} />
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
    authorized: PropTypes.bool.isRequired,
    token: PropTypes.string.isRequired,
  }).isRequired,
  getCurrentUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
