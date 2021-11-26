import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { makeStyles } from '@mui/styles';
import {
  Button,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';

import * as actions from 'actions/user';
import { getRoles } from 'actions/roles';
import { getAllOrganizations } from 'actions/organizations';
import { ROUTES } from 'constants/routes';
import { OrganizationPropType } from 'components/Organizations/sharedPropTypes';
import { ROLES } from 'constants/application';

import { createPayloadFromValues } from './utils';
import { validationSchema } from './validation';

const useStyles = makeStyles((theme) => ({
  header: {
    marginBottom: theme.spacing(4),
    color: theme.appColors.secondary,
    textAlign: 'center',
  },
  loginBody: {
    width: '460px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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
  returnLink: {
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
    width: theme.spacing(90),
    margin: `${theme.spacing(3)} auto ${theme.spacing(3)}`,

    '& .Mui-error': {
      margin: `-${theme.spacing(0.5)} 0 ${theme.spacing(1.25)}`,
    },
  },
}));

const RegisterForm = ({
  register,
  getOrganizations,
  getUserRoles,
  roles,
  organizations,
}) => {
  const classes = useStyles();
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getOrganizations();
    getUserRoles();
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    console.log(createPayloadFromValues(values, roles));
    register(createPayloadFromValues(values, roles)).then(() => {
      navigate('/');
    }).catch(() => {
      setErrorMessage('Такой пользователь уже существует');
    });
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.header}>
        <Typography variant="h3">Регистрация</Typography>
      </div>
      <Formik
        onSubmit={handleSubmit}
        initialValues={{}}
        validationSchema={validationSchema}
      >
        {
          ({
            dirty,
            setFieldValue,
            submitForm,
            values,
            errors,
          }) => (
            <Form
              className={classes.loginBody}
              onSubmit={submitForm}
            >
              <Grid container d>
                <Field
                  className={classes.input}
                  id="username"
                  type="email"
                  label="Имя пользователя"
                  name="username"
                  as={TextField}
                  variant="outlined"
                  size="small"
                  error={!!errors.username}
                  helperText={errors.username}
                  required
                />
                <Field
                  className={classes.input}
                  id="password"
                  type="password"
                  label="Пароль"
                  name="password"
                  as={TextField}
                  variant="outlined"
                  size="small"
                  error={!!errors.password}
                  helperText={errors.password}
                  required
                />
              </Grid>
              <FormControl
                variant="outlined"
                size="small"
                error={!!errors.roleId}
                required
              >
                <InputLabel id="role-label">Роль</InputLabel>
                <Field
                  name="roleName"
                  size="small"
                  as={Select}
                  id="role-select"
                  label="Роль"
                  required
                  className={classes.input}
                  value={values.roleName || ''}
                >
                  {
                    roles?.length && roles.map((role) => (
                      <MenuItem key={role.name} value={role.name}>
                        {role.name}
                      </MenuItem>
                    ))
                  }
                </Field>
                <FormHelperText className={classes.input}>{errors.roleId}</FormHelperText>
              </FormControl>
              <Field
                className={classes.input}
                id="name"
                label="Имя"
                name="name"
                as={TextField}
                variant="outlined"
                size="small"
                disabled={values.roleName === ROLES.ADMIN}
                error={!!errors.name}
                helperText={errors.name}
                required
              />
              <Field
                className={classes.input}
                id="surname"
                label="Фамилия"
                name="surname"
                as={TextField}
                variant="outlined"
                size="small"
                disabled={values.roleName === ROLES.ADMIN}
                error={!!errors.surname}
                helperText={errors.surname}
                required
              />
              <Field
                as={DatePicker}
                name="birthday"
                label="День рождения"
                inputVariant="outlined"
                error={!!errors.birthday}
                helperText={errors.birthday}
                maxDate={Date.now()}
                disabled={values.roleName === ROLES.ADMIN}
                onChange={(value) => {
                  setFieldValue('birthday', value);
                }}
                renderInput={(params) => (
                  <TextField
                    className={classes.input}
                    size="small"
                    type="date"
                    {...params}
                  />
                )}
              />
              <FormControl
                variant="outlined"
                size="small"
                error={!!errors.organizationId}
                disabled={values.roleName === ROLES.ADMIN}
                required
              >
                <InputLabel id="role-label">Организация</InputLabel>
                <Field
                  name="organizationId"
                  className={classes.input}
                  size="small"
                  as={Select}
                  value={values.organizationId || ''}
                  id="organization-select"
                  label="Организация"
                  required
                >
                  {
                    organizations?.length && organizations.map((item) => (
                      <MenuItem key={item.id} value={item.id}>
                        { item.name }
                      </MenuItem>
                    ))
                  }
                </Field>
                <FormHelperText className={classes.errorText}>
                  {errors.organizationId}
                </FormHelperText>
              </FormControl>
              <Field
                className={classes.input}
                id="goalCalories"
                label="Цель калорий"
                type="number"
                name="goalCalories"
                as={TextField}
                variant="outlined"
                size="small"
                required
                error={!!errors.goalCalories}
                helperText={errors.goalCalories}
                disabled={values.roleName === ROLES.ADMIN}
              />
              <Field
                className={classes.input}
                id="phone"
                label="Контактный номер телефона"
                name="phone"
                as={TextField}
                variant="outlined"
                size="small"
                error={!!errors.phone}
                helperText={errors.phone}
                disabled={values.roleName === ROLES.ADMIN}
                required
              />
              {errorMessage && (
                <Typography variant="caption" className={classes.errorMessage}>
                  {errorMessage}
                </Typography>
              )}
              <div className={classes.buttonContainer}>
                <Button
                  type="button"
                  className={classes.registerButton}
                  component={Link}
                  to={ROUTES.LOGIN}
                >
                  <Typography variant="body2" className={classes.returnLink}>
                    Вернуться к логину
                  </Typography>
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="primary"
                  className={classes.loginButton}
                  disabled={!dirty || !isEmpty(errors)}
                  onClick={submitForm}
                >
                  Сохранить
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
  register: actions.register,
  getUserRoles: getRoles,
  getOrganizations: getAllOrganizations,
};

const mapStateToProps = (state) => ({
  organizations: state.organizations,
  roles: state.roles,
});

RegisterForm.propTypes = {
  register: PropTypes.func.isRequired,
  getUserRoles: PropTypes.func.isRequired,
  getOrganizations: PropTypes.func.isRequired,
  organizations: PropTypes.arrayOf(OrganizationPropType).isRequired,
  roles: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  })).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterForm);
