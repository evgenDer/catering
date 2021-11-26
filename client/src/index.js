import React from 'react';
import ReactDOM from 'react-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ruLocale from 'date-fns/locale/ru';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { http } from 'api/config';
import { HTTP_STATUSES } from 'constants/api';
import * as actions from 'constants/actionTypes';

import configureStore from './store/configureStore';
import theme from './theme';

import App from './components/App';

export const store = configureStore();

http.interceptors.response.use(
  (response) => response, (error) => {
    if (error.response.data.statusCode === HTTP_STATUSES.UNAUTHORIZED) {
      store.dispatch({
        type: actions.LOGOUT,
      });
    }

    return Promise.reject(error);
  },
);

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={ruLocale}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </LocalizationProvider>
    </React.StrictMode>
  </Provider>,
  document.getElementById('root'),
);
