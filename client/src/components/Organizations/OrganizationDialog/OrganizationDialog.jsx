import React from 'react';
import PropTypes from 'prop-types';
import {
  Checkbox, FormControlLabel, Grid, TextField,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik } from 'formik';
import { isEmpty } from 'lodash';

import ConfirmationDialog from 'components/ConfirmationDialog';

import { validationSchema } from './validation';
import { OrganizationPropType } from '../sharedPropTypes';

const useStyles = makeStyles((theme) => ({
  container: {
    width: theme.spacing(60),
  },
  field: {
    marginBottom: theme.spacing(2.5),
  },
}));

const OrganizationDialog = ({
  open,
  onCancel,
  onConfirm,
  initialValues,
}) => {
  const classes = useStyles();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onConfirm}
    >
      {
        ({
          errors,
          values,
          dirty,
          isSubmitting,
          submitForm,
        }) => (
          <ConfirmationDialog
            open={open}
            onCancel={onCancel}
            onConfirm={submitForm}
            title={`${isEmpty(initialValues) ? 'Добавить' : 'Отредактировать'} организацию`}
            isConfirmButtonDisabled={!dirty || !isEmpty(errors) || isSubmitting}
            maxWidth="xl"
          >
            <Form>
              <Grid container className={classes.container}>
                <Grid container>
                  <Field
                    as={FormControlLabel}
                    control={<Checkbox />}
                    name="isActive"
                    label="Активный"
                    checked={values.isActive}
                    className={classes.field}
                    error={!!errors.isActive}
                    helperText={errors.isActive}
                    fullWidth
                  />
                </Grid>
                <Grid container>
                  <Field
                    as={TextField}
                    name="name"
                    label="Имя компании"
                    variant="outlined"
                    size="small"
                    className={classes.field}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                  />
                </Grid>
                <Field
                  as={TextField}
                  name="cardNumber"
                  label="Номер карты"
                  variant="outlined"
                  size="small"
                  className={classes.field}
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                  fullWidth
                />
              </Grid>
              <Grid container>
                <Field
                  as={TextField}
                  name="email"
                  label="Электронная почта"
                  variant="outlined"
                  size="small"
                  className={classes.field}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                />
              </Grid>
              <Grid container>
                <Field
                  as={TextField}
                  name="phone"
                  label="Контактный телефон"
                  variant="outlined"
                  size="small"
                  className={classes.field}
                  error={!!errors.phone}
                  helperText={errors.phone}
                  fullWidth
                />
              </Grid>
            </Form>
          </ConfirmationDialog>
        )
      }
    </Formik>
  );
};

OrganizationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  initialValues: OrganizationPropType,
};

OrganizationDialog.defaultProps = {
  initialValues: {},
};

export default OrganizationDialog;
