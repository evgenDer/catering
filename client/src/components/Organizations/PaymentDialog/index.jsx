import React from 'react';
import PropTypes from 'prop-types';
import {
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Field, Form, Formik } from 'formik';
import { isEmpty } from 'lodash';
import { DatePicker } from '@mui/lab';
import SummarizeIcon from '@mui/icons-material/Summarize';

import ConfirmationDialog from 'components/ConfirmationDialog';
import CustomDateRangePickerDay from 'components/CustomDateRangePickerDay';
import { formatAsPrice } from 'utils/order';
// import { validationSchema } from './validation';

const useStyles = makeStyles((theme) => ({
  container: {
    width: theme.spacing(80),
  },
  field: {
    marginBottom: theme.spacing(2.5),
  },
  iconContainer: {
    marginBottom: theme.spacing(2),
    '& .MuiTypography-root': {
      fontSize: theme.spacing(3),
    },
    '& .MuiSvgIcon-root': {
      width: theme.spacing(5),
      height: theme.spacing(5),
      marginRight: theme.spacing(1),
    },
  },
}));

const PaymentDialog = ({
  open,
  onCancel,
  onConfirm,
  usersCount,
}) => {
  const classes = useStyles();

  return (
    <Formik
      enableReinitialize
      initialValues={{
        sum: 0,
      }}
      // validationSchema={validationSchema}
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
            title="Оплатить"
            isConfirmButtonDisabled={!dirty || !isEmpty(errors) || isSubmitting}
            maxWidth="lg"
          >
            <Form>
              <Grid container className={classes.container}>
                <CustomDateRangePickerDay
                  editable
                  handleChange={(newValue) => {
                    setFieldValue('startDate', newValue[0]);
                    setFieldValue('endDate', newValue[1]);
                  }}
                />
              </Grid>
              <Grid container>
                <Field
                  as={TextField}
                  name="ownerName"
                  label="Имя владельца"
                  variant="outlined"
                  size="small"
                  className={classes.field}
                  error={!!errors.ownerName}
                  helperText={errors.ownerName}
                  fullWidth
                  required
                />
              </Grid>
              <Grid container>
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
                  required
                />
              </Grid>
              <Grid container>
                <Field
                  as={DatePicker}
                  name="expDate"
                  label="Дата окончания"
                  inputVariant="outlined"
                  className={classes.field}
                  error={!!errors.expDate}
                  minDate={Date.now()}
                  helperText={errors.expDate}
                  onChange={(value) => {
                    setFieldValue('expDate', value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      className={classes.field}
                      size="small"
                      fullWidth
                      required
                      type="date"
                      {...params}
                    />
                  )}
                />
              </Grid>
              <Grid container>
                <Field
                  as={TextField}
                  name="cvv"
                  label="CVV"
                  variant="outlined"
                  size="small"
                  className={classes.field}
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                  fullWidth
                  required
                />
              </Grid>
              <Grid container>
                <Field
                  as={TextField}
                  name="sum"
                  defaultValue="0"
                  value={values.sum}
                  label="Сумма платежа"
                  variant="outlined"
                  size="small"
                  type="number"
                  InputProps={{ inputProps: { min: 0 } }}
                  className={classes.field}
                  error={!!errors.sum}
                  helperText={errors.sum}
                  fullWidth
                  required
                />
              </Grid>
              <Grid item>
                <Typography>Текущая сумма</Typography>
                <Grid container className={classes.iconContainer}>
                  <SummarizeIcon color="secondary" />
                  <Typography>
                    {`${formatAsPrice((values.sum / usersCount).toFixed(3))}`}
                  </Typography>
                </Grid>
              </Grid>
            </Form>
          </ConfirmationDialog>
        )
      }
    </Formik>
  );
};

PaymentDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  usersCount: PropTypes.number.isRequired,
};

export default PaymentDialog;
