import React, { useEffect, useState } from 'react';
import { DatePicker } from '@mui/lab';
import { Link, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Field, Form, Formik } from 'formik';
import { makeStyles } from '@mui/styles';
import {
  Button,
  Checkbox,
  FormControlLabel,
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
    width: theme.spacing(100),
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    margin: 'auto',
  },
  input: {
    width: theme.spacing(38),
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
    justifyContent: 'flex-end',
    marginTop: theme.spacing(3),
    width: theme.spacing(81.25),
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
    margin: `${theme.spacing(5)} auto ${theme.spacing(3)}`,

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
              <Grid container spacing={5}>
                <Grid item>
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
                </Grid>
                <Grid item>
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
              </Grid>
              <Grid container spacing={5}>
                <Grid item>
                  <FormControl
                    variant="outlined"
                    size="small"
                    error={!!errors.roleName}
                    required
                  >
                    <InputLabel id="role-label">Роль</InputLabel>
                    <Field
                      name="roleName"
                      size="small"
                      as={Select}
                      id="role-select"
                      label="Роль"
                      type="text"
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
                    <FormHelperText className={classes.errorText}>{errors.roleName}</FormHelperText>
                  </FormControl>
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item>
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
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>
              <Grid container spacing={5}>
                <Grid item>
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
                </Grid>
                <Grid item>
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
                </Grid>
              </Grid>
              <Field
                className={classes.input}
                id="goalCalories"
                label="Цель калорий"
                type="number"
                name="goalCalories"
                as={TextField}
                variant="outlined"
                size="small"
                error={!!errors.goalCalories}
                helperText={errors.goalCalories}
                disabled={values.roleName !== ROLES.USER}
              />
              <Grid container>
                <Field
                  as={FormControlLabel}
                  control={<Checkbox />}
                  name="isSharingAvailable"
                  label="Разрешить другим пользователям просматривать"
                  checked={values.isSharingAvailable && values.roleName === ROLES.USER}
                  disabled={values.roleName !== ROLES.USER}
                  onChange={(event) => {
                    setFieldValue('isSharingAvailable', event.target.checked);
                  }}
                  fullWidth
                />
              </Grid>
              {errorMessage && (
                <Typography variant="caption" className={classes.errorMessage}>
                  {errorMessage}
                </Typography>
              )}
              <Grid>
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
              </Grid>
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
