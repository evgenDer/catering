import React from 'react';
import PropTypes from 'prop-types';
import { Grid, TextField } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik } from 'formik';
import { isEmpty } from 'lodash';

import ConfirmationDialog from 'components/ConfirmationDialog';
import UploaderImage from 'components/UploaderImage';

import { validationSchema } from './validation';
import { DishPropTypes } from '../sharedPropTypes';

const useStyles = makeStyles((theme) => ({
  container: {
    width: theme.spacing(60),
  },
  field: {
    margin: `${theme.spacing(1)} 0 ${theme.spacing(1.5)} 0!important`,
  },
}));

const DishesDialog = ({
  open,
  onCancel,
  onConfirm,
  initialValues,
  isPurchasedDish,
}) => {
  const classes = useStyles();

  return (
    <Formik
      enableReinitialize
      initialValues={{ ...initialValues, isPurchasedDish }}
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
          setFieldValue,
        }) => (
          <ConfirmationDialog
            open={open}
            onCancel={onCancel}
            onConfirm={submitForm}
            title={`${isEmpty(initialValues) ? 'Добавить' : 'Отредактировать'} блюдо`}
            isConfirmButtonDisabled={!dirty || !isEmpty(errors) || isSubmitting}
            maxWidth="xl"
          >
            <Form>
              <Grid container className={classes.container}>
                <Grid container>
                  {isPurchasedDish && (
                    <UploaderImage
                      imageUrl={values.imageUrl}
                      setFile={(file) => setFieldValue('file', file)}
                      setImageUrl={setFieldValue}
                    />
                  )}
                </Grid>
                <Grid container>
                  <Field
                    as={TextField}
                    name="name"
                    label="Название блюда"
                    variant="outlined"
                    size="small"
                    className={classes.field}
                    error={!!errors.name}
                    helperText={errors.name}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid container>
                  <Field
                    as={TextField}
                    name="fat"
                    type="number"
                    label="Жиры"
                    variant="outlined"
                    size="small"
                    className={classes.field}
                    error={!!errors.fat}
                    helperText={errors.fat}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid container>
                  <Field
                    as={TextField}
                    name="protein"
                    label="Белки"
                    variant="outlined"
                    type="number"
                    size="small"
                    className={classes.field}
                    error={!!errors.protein}
                    helperText={errors.protein}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid container>
                  <Field
                    as={TextField}
                    name="carbohydrates"
                    label="Углеводы"
                    type="number"
                    variant="outlined"
                    size="small"
                    className={classes.field}
                    error={!!errors.carbohydrates}
                    helperText={errors.carbohydrates}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid container>
                  <Field
                    as={TextField}
                    type="number"
                    name="count"
                    label="Количество"
                    variant="outlined"
                    size="small"
                    className={classes.field}
                    error={!!errors.count}
                    helperText={errors.count}
                    fullWidth
                    required
                  />
                </Grid>
                {isPurchasedDish && (
                  <Grid container>
                    <Field
                      as={TextField}
                      type="number"
                      name="cost"
                      label="Цена"
                      variant="outlined"
                      size="small"
                      className={classes.field}
                      error={!!errors.cost}
                      helperText={errors.cost}
                      fullWidth
                      required
                    />
                  </Grid>
                )}
              </Grid>
            </Form>
          </ConfirmationDialog>
        )
      }
    </Formik>
  );
};

DishesDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  initialValues: DishPropTypes,
  isPurchasedDish: PropTypes.bool,
};

DishesDialog.defaultProps = {
  initialValues: {},
  isPurchasedDish: false,
};

export default DishesDialog;
