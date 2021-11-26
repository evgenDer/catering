import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { makeStyles } from '@mui/styles';
import { Button, TextField, Typography } from '@mui/material';
import { connect } from 'react-redux';

import * as actions from 'actions/user';
import { ROUTES } from 'constants/routes';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(4),
    color: theme.appColors.secondary,
  },
  loginBody: {
    width: '460px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    textAlign: 'center',
    alignItems: 'stretch',
    margin: 'auto',
  },
  input: {
    width: '100%',
    marginBottom: theme.spacing(2.5),

    '& .MuiOutlinedInput-root': {
      marginBottom: theme.spacing(3),
    },
  },
  registerLink: {
    color: theme.appColors.secondary,
    backgroundColor: 'transparent',
  },
  loginButton: {
    width: '200px',
    height: '40px',
    boxShadow: 'none',
    '&:disabled': {
      color: `${theme.appColors.white} !important`,
      backgroundColor: `${theme.appColors.primary} !important`,
      opacity: 0.5,
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing(2.5),
  },
  buttonCommon: {
    lineHeight: '20px',
    cursor: 'pointer',
    fontWeight: 500,
    padding: theme.spacing(1.5, 1.25),
    '&:focus': {
      outline: 'none',
    },
  },
  errorMessage: {
    color: theme.appColors.dangerous,
    textAlign: 'start',
    paddingLeft: theme.spacing(1),
  },
  loginContainer: {
    backgroundColor: theme.appColors.white,
    display: 'flex',
    padding: theme.spacing(5, 4.25),
    flexDirection: 'column',
    boxShadow: theme.appShadows.greyShadow2,
    borderRadius: '15px',
    textAlign: 'center',
    width: theme.spacing(90),
    margin: 'auto',
    marginTop: theme.spacing(12),
  },
}));

const LoginForm = ({ login }) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    login(values.username, values.password).then(() => {
      navigate('/');
    }).catch(() => {
      setErrorMessage('Пароль или логин введены неверно');
    });
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.header}>
        <Typography variant="h3">Войти</Typography>
      </div>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{
          username: '',
          password: '',
        }}
        method="get"
      >
        {
          ({
            dirty,
            submitForm,
          }) => (
            <Form
              className={classes.loginBody}
              onSubmit={submitForm}
            >
              <Field
                className={classes.input}
                id="email"
                type="email"
                label="Имя пользователя"
                name="username"
                as={TextField}
                variant="outlined"
              />
              <Field
                className={classes.input}
                id="password"
                type="password"
                label="Пароль"
                name="password"
                as={TextField}
                variant="outlined"
              />
              {errorMessage && (
                <Typography variant="caption" className={classes.errorMessage}>
                  {errorMessage}
                </Typography>
              )}
              <div className={classes.buttonContainer}>
                <Button
                  type="button"
                  component={Link}
                  to={ROUTES.REGISTER}
                >
                  <Typography variant="body2" className={classes.registerLink}>
                    Зарегистрироваться
                  </Typography>
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.loginButton}
                  disabled={!dirty}
                  onClick={submitForm}
                >
                  Войти
                </Button>
              </div>
            </Form>
          )
        }
      </Formik>
    </div>
  );
};

const mapDispatchToProps = {
  login: actions.login,
};

LoginForm.propTypes = {
  login: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(LoginForm);
