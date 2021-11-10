import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import { AdminView } from 'components/Views';
import ErrorPage from 'components/ErrorPage';

const App = () => {
  return (
    <Routes>
      <Route path={ROUTES.ROOT} element={<Navigate replace to={ROUTES.ADMIN} />} />
      <Route path={`${ROUTES.ADMIN}/*`} element={<AdminView />} />
      <Route path={ROUTES.NOT_FOUND} element={<ErrorPage />} />
    </Routes>
  );
};

function mapStateToProps(state) {
  return {
    authorized: state.authorized,
  };
}

PropTypes.propTypes = {
  authorization: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps, null)(App);
